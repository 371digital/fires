const messages = {
  TOKEN_GENERATION_ERROR: {
    tr: "Token oluşturulurken bir problem oluştu. Lütfen daha sonra tekrar deneyin.",
    en: "An error occurred while generating the token. Please try again later.",
  },
  REGISTER_SUCCESS: {
    tr: "Kullanıcı başarı ile kayıt olmuştur.",
    en: "User has successfully registered.",
  },
  USER_NAME_EXIST: {
    tr: "Kullanıcı adı hali hazırda kulanılıyor.",
    en: "User name is already in use.",
  },
  MAIL_EXIST: {
    tr: "Mail hali haızrda kullanılıyor.",
    en: "Mail is already in use.",
  },
  USER_NOT_FOUND: {
    tr: "Kullanıcı bulunamadı!",
    en: "User not found!",
  },
  PASSWORD_INCORRECT: {
    tr: "Şifre yanlış",
    en: "Password incorrect.",
  },
  LOGIN_SUCCESS: {
    tr: "Kullanıcı başarı ile giriş yapmıştır.",
    en: "User has successfully login.",
  },
  FORGOT_PASSWORD_SUCCESS: {
    tr: "Şifre unuttum bağlantısı başarı ile gönderildi.",
    en: "Forgot password link sent successfully.",
  },
  RESET_TOKEN_DATA_NOT_FOUND: {
    tr: "Gönderilen resetTokenId için herhangi bir data bulunamadı. Lütfen önce forgot-password endpointini kullanarak resetTokenId verisini elde edin.",
    en: "No data found for the provided resetTokenId. Please first use the forgot-password endpoint to obtain the resetTokenId data.",
  },
  RESET_PASSWORD_SUCCESS: {
    tr: "Şifre başarı ile sıfırlanmıştır.",
    en: "Reset password successfully."
  }
};

export default messages;
