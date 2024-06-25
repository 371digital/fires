import fs from "fs";
import path from "path";
import VirtualRouter from "../virtualRouter";

class RouterManager {
  constructor(app, middlewareManager) {
    this.app = app;
    this.middlewareManager = middlewareManager;
    this.virtualRoutes = [];
    this.registeredRoutes = [];
  }

  getFilesInDirectory(dirPath) {
    let results = [];
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(this.getFilesInDirectory(filePath));
      } else {
        results.push(filePath);
      }
    }
    return results;
  }

  extractRelativePath(basePath, targetPath) {
    return path.relative(basePath, targetPath).replace(/\\/g, "/");
  }

  getRouterPath(parsedFile) {
    const { name, dir } = parsedFile;
    let directory = `/${dir.replace(/\\/g, "/")}`;
    const regex = /\[([^\]]+)\]/g;
    const matches = [...name.matchAll(regex)].map((match) => match[1]);
    matches.forEach((param) => (directory += `/:${param}`));
    return directory;
  }

  getRouterType(parsedFile) {
    const fileName = parsedFile.name;
    const cleanedText = fileName.replace(/\[([^\]]+)\]/g, "");
    const methods = ["get", "post", "patch", "delete"];
    const foundMethods = methods.filter((method) =>
      new RegExp(method, "i").test(cleanedText)
    );
    if (foundMethods.length === 1) {
      return foundMethods[0];
    } else if (foundMethods.length > 1) {
      throw new Error(`Multiple HTTP methods found in ${parsedFile.dir}`);
    } else {
      throw new Error(`No HTTP method found in ${parsedFile.dir}`);
    }
  }

  importEndpoint(fullPath) {
    const endpointFilePath = path.join(
      process.cwd(),
      "dist",
      "routes",
      fullPath
    );
    const endpoint = require(endpointFilePath).default;
    if (typeof endpoint === "undefined") {
      throw new Error(`Endpoint in ${fullPath} must export a default function`);
    }
    return endpoint;
  }

  addEndPoint({ routePath, handler, method = "get", data = {} }) {
    if (typeof handler !== "function") {
      throw new Error("Handler must be a function");
    }
    const validMethods = ["get", "post", "put", "delete", "patch", "use"];
    if (!validMethods.includes(method.toLowerCase())) {
      throw new Error(`Invalid HTTP method: ${method}`);
    }
    const virtualRouter = new VirtualRouter(
      method.toLowerCase(),
      routePath,
      handler,
      data
    );
    this.virtualRoutes.push(virtualRouter);
  }

  generateRouter(virtualRouter) {
    return async (request, response, next) => {
      const routerOptions = virtualRouter.data || {};

      const middlewaresResponse = await this.middlewareManager.runMiddlewares(
        {
          request,
          response,
          next,
          routerOptions,
        },
        "pre"
      );

      if (middlewaresResponse.error)
        return console.error(
          "[FIRE-API] Middleware Response Error:",
          middlewaresResponse
        );

      const endPointContext = {
        middlewaresResponse,
        query: request.query || {},
        body: request.body || {},
        params: request.params || {},
      };

      const routerResponse = await virtualRouter.handler(endPointContext, {
        request,
        response,
        next,
      });

      await this.middlewareManager.runMiddlewares(
        {
          request,
          response,
          next,
          routerOptions,
          routerResponse,
          middlewaresResponse,
        },
        "post"
      );
    };
  }

  generateRoutes() {
    this.virtualRoutes.forEach((virtualRouter) => {
      const routerHandler = this.generateRouter(virtualRouter);
      this.app[virtualRouter.method](virtualRouter.routePath, routerHandler);
    });
  }

  registerRoutes = (creatorMethod) => {
    this.registeredRoutes.push(creatorMethod);
  };

  initializeRegisteredRoutes = async () => {
    const context = {
      virtualRoutes: this.virtualRoutes,
      app: this.app,
    };
    for (let index = 0; index < this.registeredRoutes.length; index++) {
      const creatorMethod = this.registeredRoutes[index];
      const response = await creatorMethod(context);
      if (response)
        response.forEach((response) => {
          if (response) {
            this.addEndPoint(response);
          }
        });
    }
  };

  initializeRoutes = async () => {
    const cwd = process.cwd();
    const routesDir = path.join(cwd, "src", "routes");
    const routes = this.getFilesInDirectory(routesDir).map((routerPath) =>
      this.extractRelativePath(routesDir, routerPath)
    );
    routes.forEach((routerPath) => {
      const parsedFile = path.parse(routerPath);
      const routePath = this.getRouterPath(parsedFile);
      const method = this.getRouterType(parsedFile);
      const handler = this.importEndpoint(routerPath);
      this.addEndPoint({
        routePath,
        handler: handler.method,
        data: handler.data,
        method,
      });
    });
  };
}

export default RouterManager;
