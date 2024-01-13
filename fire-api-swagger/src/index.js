import swaggerUi from "swagger-ui-express";

class FireApiSwagger {
  constructor() {}

  fire = ({ documentation } = {}) => {
    return ({ app }) => {
      app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(documentation)
      );
    } 
  }
}

export default new FireApiSwagger().fire;
