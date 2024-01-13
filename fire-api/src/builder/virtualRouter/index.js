class VirtualRouter {
  constructor(method = "use", routePath, handler, data = {}) {
    this.method = method;
    this.routePath = routePath;
    this.handler = handler;
    this.data = data;
  }
};

export default VirtualRouter;