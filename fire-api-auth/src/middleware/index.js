import { verify } from "jwt";

class Middleware {
  sendResponse = (response, message) => {
    response.setHeader("Content-Type", "application/json");
    response.status(500).json({ error: message });
    return { error: message };
  };

  run = async ({ request, response, routerOptions } = {}) => {
    if (!routerOptions.useAuth) return {};

    const { headers } = request;
    if (!headers) return this.sendResponse(response, "HEADER_NOT_FOUND");

    const token = headers["x-access-token"];
    if (!token) return this.sendResponse(response, "X_ACCESS_TOKEN_NOT_FOUND");

    const { id } = await verify(token);
    if (!id || id.length === 0)
      return this.sendResponse(response, "TOKEN_NOT_VERIFIED");

    return { userId: id };
  };
}

export default new Middleware();
