interface DocumentationConfig {
  summary: string;
  description: string;
  operationId: string;
  tags: string[];
  consumes: string[];
  produces: string[];
  parameters: Parameter[];
  responses: { [key: string]: any };
  security: Object[];
}

interface Parameter {
  name: string;
  in: string;
  required: boolean;
  type: string;
  description?: string;
  schema?: Object;
}

interface ApiMiddlewareConfig {
  title: string;
  description: string;
}

interface FireApiDocumentation {
  documentation(config: DocumentationConfig): Object;
  apiMiddleware(config: ApiMiddlewareConfig): Function;
}

export default function fire(): FireApiDocumentation;
