class FireApiValidation {
  constructor() {}

  sendResponse = (response, message) => {
    response.status(500).json({ validationError: message });
  };

  fire = ({ request, response, routerOptions } = {}) => {
    try {
      if (!routerOptions.validation) return {};
      const validation = routerOptions.validation;
      const params = {
        ...(request.query || {}),
        ...(request.body || {}),
        ...(request.params || {}),
      };
      Object.keys(validation).forEach((key) => {
        const res = validation[key].validate(params[key]);
        if (res !== true) {
          return this.sendResponse(response, `${key} ${res}`);
        }
      });
      return {};
    } catch (error) {
      return this.sendResponse(
        response,
        `An unexpected error occurred ${error}`
      );
    }
  };
}

export default new FireApiValidation().fire;
