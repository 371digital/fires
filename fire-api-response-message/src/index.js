import ApiResponse from "./apiResponse";
import ApiMiddleware from "./apiMiddleware";

class FireApiResponseMessage {
  constructor() {}

  fire = ({} = {}) => {
    return {
      success: ApiResponse.success,
      error: ApiResponse.error,
      apiMiddleware: ApiMiddleware.handleRequest,
    };
  };
}

export default new FireApiResponseMessage().fire;
