import Base from "../base";

class StringValidator extends Base {
  constructor() {
    super();
    this.addRule((value) => value !== undefined || "Cannot be undefined");
  }

  // Minimum uzunluk kontrolü
  minLength(length) {
    this.addRule(
      (value) => value.length >= length || `Minimum length is ${length}`
    );
    return this;
  }

  // Maksimum uzunluk kontrolü
  maxLength(length) {
    this.addRule(
      (value) => value.length <= length || `Maximum length is ${length}`
    );
    return this;
  }

  // Regex deseni kontrolü
  regex(pattern, errorMessage) {
    this.addRule(
      (value) =>
        pattern.test(value) ||
        errorMessage ||
        `String does not match the pattern: ${pattern}`
    );
    return this;
  }

  // E-posta formatı kontrolü
  email() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.addRule((value) => emailPattern.test(value) || "Invalid email format");
    return this;
  }

  // Alfanümerik olup olmadığını kontrol etme
  alphanumeric() {
    const alphanumericPattern = /^[a-z0-9çğıöşü]+$/i;
    this.addRule(
      (value) =>
        alphanumericPattern.test(value) || "String must be alphanumeric"
    );
    return this;
  }

  // Sadece harf kontrolü
  lettersOnly() {
    const lettersPattern = /^[A-Za-zğüşıöçĞÜŞİÖÇ]+$/;
    this.addRule(
      (value) =>
        lettersPattern.test(value) || "String must contain letters only"
    );
    return this;
  }

  // Boşluk içerip içermediğini kontrol etme
  noSpaces() {
    const spacePattern = /\s/;
    this.addRule(
      (value) => !spacePattern.test(value) || "String must not contain spaces"
    );
    return this;
  }

  // Belirli bir string'i içerip içermediğini kontrol etme
  contains(substring) {
    this.addRule(
      (value) =>
        value.includes(substring) || `String must contain: ${substring}`
    );
    return this;
  }

  // Belirli bir string ile başlayıp başlamadığını kontrol etme
  startsWith(substring) {
    this.addRule(
      (value) =>
        value.startsWith(substring) || `String must start with: ${substring}`
    );
    return this;
  }

  // Belirli bir string ile bitip bitmediğini kontrol etme
  endsWith(substring) {
    this.addRule(
      (value) =>
        value.endsWith(substring) || `String must end with: ${substring}`
    );
    return this;
  }

  // Özel karakter içerip içermediğini kontrol etme
  noSpecialCharacters() {
    const specialCharPattern = /[^a-zA-Z0-9 ]/g;
    this.addRule(
      (value) =>
        !specialCharPattern.test(value) ||
        "String must not contain special characters"
    );
    return this;
  }

  customRule(method) {
    this.addRule(method);
    return this;
  }
}

export default StringValidator;
