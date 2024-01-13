interface StringValidatorInterface {
  minLength(length: number): StringValidatorInterface;
  maxLength(length: number): StringValidatorInterface;
  regex(pattern: RegExp): StringValidatorInterface;
  email(): StringValidatorInterface;
  alphanumeric(): StringValidatorInterface;
  lettersOnly(): StringValidatorInterface;
  noSpaces(): StringValidatorInterface;
  contains(substring: string): StringValidatorInterface;
  startsWith(substring: string): StringValidatorInterface;
  endsWith(substring: string): StringValidatorInterface;
  noSpecialCharacters(): StringValidatorInterface;
  customRule(method: (value: string) => boolean | string): StringValidatorInterface;
}

interface NumberValidatorInterface {
  min(value: number): NumberValidatorInterface;
  max(value: number): NumberValidatorInterface;
  integer(): NumberValidatorInterface;
  positive(): NumberValidatorInterface;
  negative(): NumberValidatorInterface;
  equal(value: number): NumberValidatorInterface;
  range(min: number, max: number): NumberValidatorInterface;
  prime(): NumberValidatorInterface;
  nonZero(): NumberValidatorInterface;
  customRule(method: (value: number) => boolean | string): NumberValidatorInterface;
}

interface ObjectValidatorInterface {
  hasProperty(propertyName: string, validator: ObjectValidator): ObjectValidatorInterface;
  validate(object: Record<string, any>): true | string;
  shape(shape: Record<string, ObjectValidator>): ObjectValidatorInterface;
  notEmpty(): ObjectValidatorInterface;
  customRule(method: (value: Record<string, any>) => boolean | string): ObjectValidatorInterface;
}

interface FireValidation {
  string: StringValidatorInterface;
  number: NumberValidatorInterface;
  object: ObjectValidatorInterface;
}

export default function fire(): FireValidation;
