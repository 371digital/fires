class FireApiValidation {
  constructor() {}

  sendResponse = (response, message) => {
    response.setHeader("Content-Type", "application/json");
    response.status(500).json({error: message});
    return {error: message}
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
  
      const keys = Object.keys(validation);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(validation[key]?.validate) {
          const res = validation[key].validate(params[key]);
          if (res !== true) {
            return this.sendResponse(response, `${key} ${res}`);
          }
        }
      }
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
