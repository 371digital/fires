import { FireMongo, FireValidation } from "371fire";

const mongoose = FireMongo();

export default {
  userName: FireValidation()
    .string()
    .minLength(3)
    .maxLength(20)
    .alphanumeric()
    .noSpaces()
    .noSpecialCharacters(),
  password: FireValidation()
    .string()
    .minLength(8) // Minimum uzunluk
    .maxLength(20) // Maksimum uzunluk
    .regex(/[a-z]/, "Must contain at least one lowercase letter") // Küçük harf kontrolü
    .regex(/[A-Z]/, "Must contain at least one uppercase letter") // Büyük harf kontrolü
    .regex(/[0-9]/, "Must contain at least one digit") // Rakam kontrolü
    .regex(/[\W_]/, "Must contain at least one special character"), // Özel karakter kontrolü,
  fullName: FireValidation()
    .string()
    .minLength(1) // Minimum uzunluk
    .maxLength(50) // Maksimum uzunluk
    .regex(
      /^[A-Za-zçğıöşüÇĞİÖŞÜ\s]+$/,
      "Full name must contain letters and spaces only"
    ) // Sadece harfler ve boşluklar
    .regex(
      /^[A-Za-zçğıöşüÇĞİÖŞÜ]+(?: [A-Za-zçğıöşüÇĞİÖŞÜ]+)*$/,
      "Full name must not start or end with a space and must not contain consecutive spaces"
    ), // Ardışık boşluk yok, başta ve sonda boşluk yok
  mail: FireValidation().string().email(),
  name: FireValidation()
    .string()
    .minLength(1) // Minimum uzunluk
    .maxLength(30) // Maksimum uzunluk
    .lettersOnly() // Sadece harfler
    .noSpaces(), // Boşluk yok,
  surName: FireValidation()
    .string()
    .minLength(1) // Minimum uzunluk
    .maxLength(30) // Maksimum uzunluk
    .lettersOnly() // Sadece harfler
    .noSpaces(), // Boşluk yok
  birthDay: FireValidation()
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Birthday must be in the format YYYY-MM-DD"),
  gender: FireValidation()
    .string()
    .regex(
      /^(male|female|other)$/,
      "Gender must be one of the following: male, female, or other"
    ),
  userNameOrMail: FireValidation()
    .string()
    .customRule((value) => {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isUserName = /^[a-zA-Z0-9_]{3,20}$/.test(value); // Kullanıcı adı için alfanumerik ve alt çizgi, 3-20 karakter arası
      if (isEmail || isUserName) {
        return true;
      }
      return "Must be a valid email or username (3-20 characters, alphanumeric and underscore)";
    }),
  resetTokenId: FireValidation()
    .string()
    .customRule((value) => {
      return mongoose.isValidObjectId(value) || "Must be a valid id";
    }),
};
