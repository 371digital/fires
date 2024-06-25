import ApiResponse from "../apiResponse";
import Message from "../message";

class ApiMiddleware {
  static sendResponse(response, message) {
    try {
      const statusCode = message?.isSuccess ? 200 : 500;
      response.setHeader("Content-Type", "application/json");
      return response.status(statusCode).json(message);
    } catch (error) {
      return {error};
    }
  }

  static handleRequest({ request, response, routerResponse }) {
    try {
      const language = request.headers["accept-language"];
      if (routerResponse instanceof Message) {
        const localizedMessage =
          typeof routerResponse.message === "object"
            ? routerResponse.message[language] || routerResponse.message
            : routerResponse.message;

        return ApiMiddleware.sendResponse(response, {
          ...routerResponse,
          message: localizedMessage,
        });
      }
      return ApiMiddleware.sendResponse(response, routerResponse);
    } catch (error) {
      return ApiMiddleware.sendResponse(
        response,
        ApiResponse.error(`An unexpected error occurred ${error}`)
      );
    }
  }
}

export default ApiMiddleware;
