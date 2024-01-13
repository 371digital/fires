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
    const relevantMiddlewares = this.middlewares.filter(
      (m) => m.lifeCycle === lifeCycle
    );

    for (const { middleware } of relevantMiddlewares) {
      await this.executeMiddleware(middleware, context);
    }
  }

  async executeMiddleware(middleware, context) {
    try {
      await middleware(context);
    } catch (error) {
      console.error("Middleware execution error:", error);
      throw error;
    }
  }
}

export default MiddlewareManager;
