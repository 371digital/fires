import StringValidator from "./stringValidator";
import NumberValidator from "./numberValidator";
import ObjectValidator from "./objectValidator";

class Validation {
  static string() {
    return new StringValidator();
  }
  static number() {
    return new NumberValidator();
  }
  static object(){
    return new ObjectValidator();
  }
}
export default Validation;
