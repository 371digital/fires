import { FireApi, FireMongo } from "371fire";
import validationRules from "validationRules";
import register from "./register";
import login from "./login";
import forgotPassword from "./forgotPassword";
import resetPassword from "./resetPassword";

const { VirtualRouter } = FireApi();
const { createConnection } = FireMongo();

const createRoute = ({
  handler,
  method,
  routePath,
  configuration,
  connection,
}) => {
  const validation = {};

  Object.keys(configuration || {}).forEach((configurationKey) => {
    if (
      configuration[configurationKey]?.active &&
      configuration[configurationKey].validation
    ) {
      validation[configurationKey] = configuration[configurationKey].validation;
    }
  });

  return new VirtualRouter(
    method,
    routePath,
    (...params) => handler(...params, { configuration, connection }),
    {
      validation,
    }
  );
};

class Routes {
  constructor() {
    this.configuration = {};
  }

  setObjectValue(obj, path, value) {
    const keys = path.split(".");
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  }

  setConfiguration = ({ key, validation, ...props }) => {
    this.setObjectValue(this.configuration, key, {
      active: true,
      validation,
      ...props,
    });
    return this;
  };

  useUserNameForRegister = ({ validation } = {}) =>
    this.setConfiguration({
      key: "register.userName",
      validation: validation || validationRules.userName,
    });

  usePasswordForRegister = ({ validation } = {}) =>
    this.setConfiguration({
      key: "register.password",
      validation: validation || validationRules.password,
    });

  useFullNameForRegister = ({ validation } = {}) =>
    this.setConfiguration({
      key: "register.fullName",
      validation: validation || validationRules.fullName,
    });

  useMailForRegister = ({ validation } = {}) =>
    this.setConfiguration({
      key: "register.mail",
      validation: validation || validationRules.mail,
    });

  useNameForRegister = ({ validation } = {}) =>
    this.setConfiguration({
      key: "register.name",
      validation: validation || validationRules.name,
    });

  useSurNameForRegister = ({ validation } = {}) =>
    this.setConfiguration({
      key: "register.surName",
      validation: validation || validationRules.surName,
    });

  useBirthdayForRegister = ({ validation } = {}) =>
    this.setConfiguration({
      key: "register.birthday",
      validation: validation || validationRules.birthDay,
    });

  useGenderForRegister = ({ validation } = {}) =>
    this.setConfiguration({
      key: "register.gender",
      validation: validation || validationRules.gender,
    });

  useUserNameForLogin = ({ validation } = {}) =>
    this.setConfiguration({
      key: "login.userName",
      validation: validation || validationRules.userName,
    });

  useMailForLogin = ({ validation } = {}) =>
    this.setConfiguration({
      key: "login.mail",
      validation: validation || validationRules.mail,
    });

  useUserNameOrMailForLogin = ({ validation } = {}) =>
    this.setConfiguration({
      key: "login.userNameOrMail",
      validation: validation || validationRules.userNameOrMail,
    });

  usePasswordForLogin = ({ validation } = {}) =>
    this.setConfiguration({
      key: "login.password",
      validation: validation || validationRules.password,
    });

  useMailForForgotPassword = ({ validation } = {}) =>
    this.setConfiguration({
      key: "forgotPassword.mail",
      validation: validation || validationRules.mail,
    });

  setMailFieldsForgotPassword = ({
    subject,
    text,
    customHtmlPath,
    customHtmlParams,
    fromName,
    generateHref,
    image,
    title,
    subTitle,
    content,
    company,
    buttonText,
  } = {}) =>
    this.setConfiguration({
      key: "forgotPassword.mailFields",
      subject,
      text,
      customHtmlPath,
      customHtmlParams,
      fromName,
      generateHref,
      image,
      title,
      subTitle,
      content,
      company,
      buttonText,
    });

  useResetTokenForResetPassword = ({ validation } = {}) =>
    this.setConfiguration({
      key: "resetPassword.resetTokenId",
      validation: validation || validationRules.resetTokenId,
    });

  usePasswordForResetPassword = ({ validation } = {}) =>
    this.setConfiguration({
      key: "resetPassword.password",
      validation: validation || validationRules.password,
    });

  build = () => {
    return async () => {
      const connection = await createConnection(process.env.DB_URL).asPromise();
      return [
        createRoute({
          configuration: this.configuration.register,
          routePath: "/auth/register",
          handler: register,
          method: "post",
          connection,
        }),
        createRoute({
          configuration: this.configuration.login,
          routePath: "/auth/login",
          handler: login,
          method: "post",
          connection,
        }),
        createRoute({
          configuration: this.configuration.forgotPassword,
          routePath: "/auth/forgot-password",
          handler: forgotPassword,
          method: "post",
          connection,
        }),
        createRoute({
          configuration: this.configuration.resetPassword,
          routePath: "/auth/reset-password",
          handler: resetPassword,
          method: "post",
          connection,
        }),
      ];
    };
  };
}

export default Routes;
