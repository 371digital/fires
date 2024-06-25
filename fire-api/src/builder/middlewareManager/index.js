class MiddlewareManager {
  constructor() {
    this.middlewares = [];
  }

  addMiddleware(middleware, lifeCycle) {
    if (typeof middleware !== "function") {
      throw new TypeError("Middleware must be a function");
    }
    this.middlewares.push({ lifeCycle, middleware });
  }

  async runMiddlewares(context, lifeCycle) {
    let responses = {}
    const relevantMiddlewares = this.middlewares.filter(
      (m) => m.lifeCycle === lifeCycle
    );

    for (const { middleware } of relevantMiddlewares) {
      const middlewareResponse = await this.executeMiddleware(middleware, context);
      if(middlewareResponse && typeof middlewareResponse === "object") {
        if(middlewareResponse?.error) return middlewareResponse;
        responses = { ...responses, ...middlewareResponse || {}}
      } 
    }
    return responses;
  }

  async executeMiddleware(middleware, context) {
    try {
     return await middleware(context);
    } catch (error) {
      return {error}
    }
  }
}

export default MiddlewareManager;
