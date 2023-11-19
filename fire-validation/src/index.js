import types from "./types";
import messages from "./messages";

/**
 * @typedef {("password" | "string" | "number" | "email" | "length" | "required" | "id" | "array" | "nestedSlug" | "oneOf" | "isObject" | "nestedSlug" | "schema" | "slug" | "version")} TypePatterns
 */

/**
 * @typedef {object} ValidationInterface
 * @property {TypePatterns} type - Specifies a particular data type.
 * @property {object} typeOptions - Options specific to the data type.
 * @property {string} fieldTitle - The title of the field.
 * @property {boolean} optional - Indicates whether it's optional, default is false.
 */

class FireValidation {
  constructor() {}

  returnMessage = (message) => ({
    status: false,
    message,
  });

  /**
   * Validates properties against a given schema.
   * @param {Object} props - Props object for validation.
   * @param {Object<string, ValidationInterface>} props.schema - Validation schema.
   * @param {Object<string, any>} [props.data] - Properties to be validated.
   * @returns {Promise<{ status: boolean, message?: string }>} - Validation status and optional message.
   */
  fire = async (props = {}) => {
    const { schema = {}, data = {} } = props;
    const propNames = Object.keys(schema);

    for (const propName of propNames) {
      const schemaFields = schema[propName] || {};
      const value = data[propName];

      const valueValidate = types.required(value);
      if (schemaFields.optional && !valueValidate) return { status: true };
      if (!valueValidate)
        return this.returnMessage(
          messages.required(schemaFields.fieldTitle, value)
        );

      const typeValidate = types[schemaFields.type](
        value,
        schemaFields.typeOptions
      );
      const typeMessage = messages[schemaFields.type];
      if (!typeValidate)
        return this.returnMessage(
          typeMessage(schemaFields.fieldTitle, value, schemaFields.typeOptions)
        );
    }

    return {
      status: true,
    };
  }
}

export default new FireValidation().fire;
