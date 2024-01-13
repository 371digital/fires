import MiddlewareManager from "./middlewareManager";
import RouteManager from "./routeManager";

class Builder {
  constructor({ app, server }) {
    this.app = app;
    this.server = server;
    this.middlewareManager = new MiddlewareManager();
    this.routeManager = new RouteManager(app, this.middlewareManager);
  }

  preRouteRun = (method) => {
    this.middlewareManager.addMiddleware(method, "pre");
    return this;
  };

  postRouteRun = (method) => {
    this.middlewareManager.addMiddleware(method, "post");
    return this;
  };  

  registerRoutes = (creatorMethod) => {
    this.routeManager.registerRoutes(creatorMethod);
    return this;
  };

  start = async ({ port }) => {
    this.routeManager.initializeRoutes();
    this.routeManager.initializeRegisteredRoutes();
    this.routeManager.generateRoutes();
    return await new Promise((resolve) => {
      this.server.listen(port, resolve);
    });
  };
}

export default Builder;
