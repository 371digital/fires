interface RoutesInterface {
  configuration: Record<string, any>;

  setObjectValue(obj: Record<string, any>, path: string, value: any): void;

  setConfiguration(config: {
    key: string;
    validation?: Function;
    [key: string]: any;
  }): this;

  useUserNameForRegister(options?: { validation?: Function }): this;
  usePasswordForRegister(options?: { validation?: Function }): this;
  useFullNameForRegister(options?: { validation?: Function }): this;
  useMailForRegister(options?: { validation?: Function }): this;
  useNameForRegister(options?: { validation?: Function }): this;
  useSurNameForRegister(options?: { validation?: Function }): this;
  useBirthdayForRegister(options?: { validation?: Function }): this;
  useGenderForRegister(options?: { validation?: Function }): this;

  useUserNameForLogin(options?: { validation?: Function }): this;
  useMailForLogin(options?: { validation?: Function }): this;
  useUserNameOrMailForLogin(options?: { validation?: Function }): this;
  usePasswordForLogin(options?: { validation?: Function }): this;

  useMailForForgotPassword(options?: { validation?: Function }): this;
  setMailFieldsForgotPassword(options?: {
    subject?: string;
    text?: string;
    customHtmlPath?: string;
    customHtmlParams?: object;
    fromName?: string;
    generateHref?: Function;
    image?: string;
    title?: string;
    subTitle?: string;
    content?: string;
    company?: string;
    buttonText?: string;
  }): this;

  useResetTokenForResetPassword(options?: { validation?: Function }): this;
  usePasswordForResetPassword(options?: { validation?: Function }): this;

  build(): () => Promise<any[]>;
}


interface FireApiAuth {
  routes: RoutesInterface;
  apiMiddleware: () => Promise<any[]>;
}

export default function fire(): FireApiAuth;