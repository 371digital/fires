import Base from "../base";

class NumberValidator extends Base {
  constructor() {
    super();
    this.addRule(value => value !== undefined || 'Cannot be undefined');
  }

  // Minimum değer kontrolü
  min(value) {
    this.addRule(
      (number) => number >= value || `Number must be at least ${value}`
    );
    return this;
  }

  // Maksimum değer kontrolü
  max(value) {
    this.addRule(
      (number) => number <= value || `Number must be at most ${value}`
    );
    return this;
  }

  // Tam sayı olup olmadığını kontrol etme
  integer() {
    this.addRule(
      (number) => Number.isInteger(number) || "Number must be an integer"
    );
    return this;
  }

  // Pozitif sayı kontrolü
  positive() {
    this.addRule((number) => number > 0 || "Number must be positive");
    return this;
  }

  // Negatif sayı kontrolü
  negative() {
    this.addRule((number) => number < 0 || "Number must be negative");
    return this;
  }

  // Belirli bir değere eşit olup olmadığını kontrol etme
  equal(value) {
    this.addRule(
      (number) => number === value || `Number must be equal to ${value}`
    );
    return this;
  }

  // Belirli bir aralıkta olup olmadığını kontrol etme
  range(min, max) {
    this.addRule(
      (number) =>
        (number >= min && number <= max) ||
        `Number must be between ${min} and ${max}`
    );
    return this;
  }

  // Asal sayı olup olmadığını kontrol etme
  prime() {
    this.addRule((number) => {
      if (number < 2) return "Number must be a prime (greater than 1)";
      for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return "Number must be a prime";
      }
      return true;
    });
    return this;
  }

  // Sıfırdan farklı olup olmadığını kontrol etme
  nonZero() {
    this.addRule((number) => number !== 0 || "Number must not be zero");
    return this;
  }

  customRule(method) {
    this.addRule(method)
    return this;
  }
}
export default NumberValidator;
