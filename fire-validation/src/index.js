import validator from "./validator";
class FireValidation {
  constructor() {
  }

  fire({} = {}) { 
    return validator
  }
}

export default new FireValidation().fire;