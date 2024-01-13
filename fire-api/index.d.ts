interface Route {
  method: Function,
  data: Object
}

interface Builder {
  preRouteRun(method: ({request: any, response: any, next: any, routerOptions: any }) => void): Builder;

  postRouteRun(method: ({request: any, response: any, next: any, routerOptions: any, routerResponse: any, middlewaresResponse: any }) => void): Builder;

  registerRoutes(creatorMethod: () => void): Builder;

  start(config: { port: number }): Promise<void>;
}

interface FireApi {
  createRoute(method:string, middlewareParams:object): Route;
  builder: Builder;
}

export default function fire(): FireApi;
