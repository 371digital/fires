const typesMessages = {
  id: (fieldTitle, value) =>
    `${fieldTitle} parameter must be of type id. (${value}).`,
  password: (fieldTitle, value) =>
    `${fieldTitle} parameter must be of type password. (${value}).`,
  string: (fieldTitle, value) =>
    `${fieldTitle} parameter must be of type string. (${value})`,
  number: (fieldTitle, value) =>
    `${fieldTitle} parameter must be of type number. (${value})`,
  email: (fieldTitle, value) =>
    `${fieldTitle} parameter must be of type email. (${value})`,
  length: (fieldTitle, value, options) => {
    let lengthText = "";
    lengthText = `${lengthText} between ${options.min ? options.min : 0} and `;
    lengthText = `${lengthText} ${options.max ? options.max : "∞"}.`;
    return `The length of ${fieldTitle} parameter must be ${lengthText} (${value})`;
  },
  required: (fieldTitle, value) =>
    `${fieldTitle} parameter must be sent (${value})`,
  array: (fieldTitle, value) =>
    `${fieldTitle} parameter must be in array format (${value})`,
  nestedSlug: (fieldTitle, value) =>
    `${fieldTitle} parameter must be in slug format (${value})`,
  slug: (fieldTitle, value) =>
    `${fieldTitle} parameter must be in slug format (${value})`,
  schema: (fieldTitle, value, typeOptions) =>
    `${fieldTitle} parameter does not match the ${JSON.stringify(
      typeOptions
    )} schema. (${JSON.stringify(value)})`,
  version: (fieldTitle, value) =>
    `${fieldTitle} parameter must be in version (1.0.0) format (${value})`,
  oneOf: (fieldTitle, value, typeOptions) =>
    `${fieldTitle} parameter must be one of [${typeOptions.options}]. (${value})`,
  isObject: (fieldTitle, value) =>
    `${fieldTitle} parameter must be an object (${value})`,
};

export default typesMessages;
