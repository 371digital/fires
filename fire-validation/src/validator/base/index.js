class Base {
  constructor() {
    this.rules = [];
  }

  validate(value) {
    for (let rule of this.rules) {
      const result = rule(value);
      if (result !== true) {
        return result;
      }
    }
    return true;
  }

  addRule(rule) {
    this.rules.push(rule);
    return this;
  }
}
export default Base;
