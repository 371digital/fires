interface Route {
  method: Function;
  data: Object;
}

interface Builder {
  preRouteRun(
    method: ({
      request: any,
      response: any,
      next: any,
      routerOptions: any,
    }) => void
  ): Builder;

  postRouteRun(
    method: ({
      request: any,
      response: any,
      next: any,
      routerOptions: any,
      routerResponse: any,
      middlewaresResponse: any,
    }) => void
  ): Builder;

  registerRoutes(creatorMethod: () => void): Builder;

  start(config: { port: number }): Promise<void>;
}

interface IVirtualRouterOptions {
  method: "use" | "get" | "post" | "delete" | "patch";
  routePath: string;
  handler: (
    { middlewaresResponse: any, query: any, body: any, params: any },
    { request: any, response: any, next: any }
  ) => void;
  data?: object;
}

class VirtualRouter {
  method: "use" | "get" | "post" | "delete" | "patch";
  routePath: string;
  handler: (
    {
      middlewaresResponse: object,
      query: object,
      body: object,
      params: object,
    },
    { request: any, response: any, next: any }
  ) => void;
  data: object;

  constructor(options: IVirtualRouterOptions) {
    this.method = options.method || "use";
    this.routePath = options.routePath;
    this.handler = options.handler;
    this.data = options.data || {};
  }
}

interface FireApi {
  createRoute(method: string, middlewareParams: object): Route;
  builder: Builder;
  VirtualRouter: typeof VirtualRouter;
}

export default function fire(): FireApi {
  const api: FireApi = {
    createRoute: function (method: string, middlewareParams: object): Route {
      return { method: new Function(), data: {} };
    },
    builder: {
      preRouteRun: function (method) {
        return this;
      },
      postRouteRun: function (method) {
        return this;
      },
      registerRoutes: function (creatorMethod) {
        return this;
      },
      start: async function (config) {},
    },
    VirtualRouter: VirtualRouter,
  };

  return api;
}
