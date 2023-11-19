import "dotenv/config";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import { FireValidation } from "371fire";

class FireApi {
  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(mongoSanitize());
    this.app.use(express.json());
    this.server = http.createServer(this.app);

    this.virtualRouters = {};
    this.errorMessages = {};
    this.successMessages = {};
  }

  async connectDB(url) {
    mongoose.set("strictQuery", true);
    await mongoose.connect(url);
    return;
  }

  async startServer(port, mongoUrl) {
    return await new Promise(async (resolve, reject) => {
      await this.connectDB(mongoUrl);
      this.server.listen(port, resolve);
    });
  }

  resolve = (response, data) => {
    response.status(200).json(data);
  };

  reject = (response, message) => {
    response.status(400).json({
      message: message,
    });
  };

  methodProvider = async (request, response, method, routerInfo) => {
    let data = routerInfo.type === "post" ? request.body : request.query;

    if (routerInfo.validation) {
      const validationResult = await FireValidation({
        schema: routerInfo.validation,
        data,
      });
      if (!validationResult.status)
        return this.reject(response, validationResult.message);
    }

    if (routerInfo?.middlewares?.length) {
      for (let i = 0; i < routerInfo?.middlewares.length; i++) {
        const middleware = routerInfo?.middlewares[i];
        const middlewareResponse = await middleware(data);
        if (!middlewareResponse?.status)
          return this.reject(response, middlewareResponse?.message);
        if (middlewareResponse?.extraData) {
          data = { ...data, ...middlewareResponse.extraData };
        }
      }
    }

    const methodResponse = await method(data);
    if (!methodResponse) return this.reject(response, "response not found");

    if (this.errorMessages[methodResponse.message])
      return this.reject(response, this.errorMessages[methodResponse.message]);

    if (this.successMessages[methodResponse.message])
      return this.resolve(response, {
        message: this.successMessages[methodResponse.message],
        data: methodResponse.data,
      });
    return this.resolve(response, methodResponse);
  };

  createRoutes = (routes) => {
    const applyMiddlewaresAndMethods = (router, routeInfo) => {
      const { method, type, middlewares = [] } = routeInfo;
      if (typeof method === "function") {
        router[type.toLowerCase()]("/", [
          ...middlewares,
          (req, res) => this.methodProvider(req, res, method, routeInfo),
        ]);
      }
    };

    const createNestedRoutes = (router, nestedRoutes, middlewares = []) => {
      Object.keys(nestedRoutes).forEach((nestedRouteKey) => {
        const nestedRouteInfo = nestedRoutes[nestedRouteKey];
        const { routes: subRoutes = {}, middlewares: nestedMiddlewares = [] } =
          nestedRouteInfo;

        const nestedRouter = express.Router();
        const allMiddlewares = [...middlewares, ...nestedMiddlewares];

        applyMiddlewaresAndMethods(nestedRouter, nestedRouteInfo);

        if (Object.keys(subRoutes).length > 0) {
          createNestedRoutes(nestedRouter, subRoutes, allMiddlewares);
        }

        router.use(`/${nestedRouteKey}`, nestedRouter);
      });
    };

    Object.keys(routes).forEach((routeKey) => {
      const routeInfo = routes[routeKey];
      const { routes: subRoutes = {}, middlewares = [] } = routeInfo;

      const router = express.Router();
      applyMiddlewaresAndMethods(router, routeInfo);
      createNestedRoutes(router, subRoutes, middlewares);

      this.virtualRouters[routeKey] = router;
      this.app.use(`/${routeKey}`, router);
    });
  };

  setErrorMessages = (errorMessages) => {
    this.errorMessages = errorMessages;
  };

  setSuccessMessages = (successMessages) => {
    this.successMessages = successMessages;
  };

  fire = ({} = {}) => {
    return {
      start: async ({ port, mongoUrl, routers } = {}) => {
        this.createRoutes(routers);
        return this.startServer(port, mongoUrl);
      },
      setErrorMessages: this.setErrorMessages,
      setSuccessMessages: this.setSuccessMessages,
      Mongoose: mongoose,
    };
  };
}

export default new FireApi().fire;
