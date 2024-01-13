import Base from "../base";

class ObjectValidator extends Base {
  constructor() {
    super();
    this.propertyValidators = {};
    this.addRule(value => value !== undefined || 'Cannot be undefined');

  }

  // Bir özelliği belirli bir doğrulayıcı ile kontrol etme
  hasProperty(propertyName, validator) {
    this.addRule(
      (object) =>
        object.hasOwnProperty(propertyName) ||
        `Object must have property: ${propertyName}`
    );
    this.propertyValidators[propertyName] = validator;
    return this;
  }

  // Tüm özelliklerin doğrulamasını gerçekleştirme
  validate(object) {
    const basicValidation = super.validate(object);
    if (basicValidation !== true) {
      return basicValidation;
    }

    for (const propertyName in this.propertyValidators) {
      if (object.hasOwnProperty(propertyName)) {
        const result = this.propertyValidators[propertyName].validate(
          object[propertyName]
        );
        if (result !== true) {
          return result;
        }
      }
    }

    return true;
  }

  // Nesnenin belirli bir yapıya sahip olup olmadığını kontrol etme
  shape(shape) {
    this.addRule((object) => {
      for (const key in shape) {
        if (!shape[key].validate(object[key])) {
          return `Property ${key} failed validation`;
        }
      }
      return true;
    });
    return this;
  }

  // Nesnenin boş olup olmadığını kontrol etme
  notEmpty() {
    this.addRule(
      (object) => Object.keys(object).length > 0 || "Object must not be empty"
    );
    return this;
  }
  
  customRule(method) {
    this.addRule(method)
    return this;
  }
}

export default ObjectValidator
