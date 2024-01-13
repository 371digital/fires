import swaggerUi from "swagger-ui-express";

class FireApiDocumentation {
  constructor() {}

  generateSwaggerDocumentation = ({ title, description, virtualRoutes }) => {
    const documentation = {
      swagger: "2.0",
      info: {
        title: title,
        description: description,
        version: "1.0.0",
      },
      basePath: "/",
      schemes: ["http"],
      paths: {},
    };

    virtualRoutes.forEach((route) => {
      const path = route.routePath.replace(/:([^\/]+)/g, "{$1}"); // Convert :param to {param}
      if (!documentation.paths[path]) {
        documentation.paths[path] = {};
      }
      documentation.paths[path][route.method] =
        route?.data?.documentation || {};
    });

    return documentation;
  };

  generateRoute = (context) => {
    context.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(this.generateSwaggerDocumentation(context))
    );
  };

  /**
   * Constructs a Documentation object.
   *
   * @param {Object} config Configuration for the Swagger path.
   * @param {string} config.summary A brief summary of the API endpoint.
   * @param {string} config.description A detailed description of the API endpoint.
   * @param {string} config.operationId A unique string used to identify the operation.
   * @param {string[]} config.tags A list of tags for API documentation control.
   * @param {string[]} config.consumes List of MIME types the API can consume.
   * @param {string[]} config.produces List of MIME types the API can produce.
   * @param {Object[]} config.parameters A list of parameters for the API endpoint.
   * @param {string} config.parameters[].name The name of the parameter.
   * @param {string} config.parameters[].in The location of the parameter (e.g., "query", "header", "path", "body").
   * @param {boolean} config.parameters[].required Specifies whether the parameter is mandatory.
   * @param {string} config.parameters[].type The type of the parameter (e.g., "string", "number").
   * @param {string} [config.parameters[].description] A brief description of the parameter.
   * @param {Object} [config.parameters[].schema] The schema defining the structure of a complex parameter (used with "body" parameters).
   * @param {Object} config.responses The possible responses from the API endpoint.
   * @param {Object[]} config.security Security definitions for the API endpoint.
   * @returns {Object} The Swagger path object.
   */
  documentation = (config) => {
    return config;
  };

  apiMiddleware = ({ title, description }) => {
    return ({ app, virtualRoutes }) => [
      this.generateRoute({ title, description, app, virtualRoutes }),
    ];
  };

  fire = ({} = {}) => {
    return {
      documentation: this.documentation,
      apiMiddleware: this.apiMiddleware,
    };
  };
}

export default new FireApiDocumentation().fire;
