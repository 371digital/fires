import Routes from "./routes";
import Middleware from "./middleware";

class FireApiAuth {
  constructor() {}

  fire = ({} = {}) => {
    return {
      apiMiddleware: Middleware.run,
      routes: new Routes(),
    };
  };
}

export default new FireApiAuth().fire;
