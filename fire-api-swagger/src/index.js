import swagger from "swagger-ui-express";

class FireApiSwagger {
  constructor() {}

  fire({ document } = {}) {
    return ({ app }) => {
      app.use("/api-docs", swagger.serve);
      app.get("/api-docs", swagger.setup(document));
    };
  }
}

export default new FireApiSwagger().fire;
