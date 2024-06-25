import { FireMailer, FireApiResponseMessage } from "371fire";
import messages from "messages";
import path from "path";

const { error, success } = FireApiResponseMessage();
const mailer = FireMailer();

const forgotPassword = async (
  { query, body, params },
  {},
  { configuration, connection }
) => {
  if (!configuration.mail) {
    return console.log(
      "[FIRE-API-AUTH] Your configuration does not include a mail for forgot password, therefore the endpoint will not work!"
    );
  }
  const allRequestParameters = {
    ...query,
    ...body,
    ...params,
  };
  const userModel = connection.collection("users");
  const resetTokenModel = connection.collection("reset.tokens");

  const userData = await userModel.findOne({ mail: allRequestParameters.mail });
  if (!userData)
    return error(messages.USER_NOT_FOUND, { messageKey: "USER_NOT_FOUND" });

  const tokenData = await resetTokenModel.insertOne({
    completed: false,
    user: JSON.parse(JSON.stringify(userData._id)),
  });

  await mailer.send({
    htmlPath:
      configuration.mailFields.customHtmlPath ||
      path.join(__dirname, "mail.html"),
    fromName: configuration.mailFields.fromName || "Fire Proton",
    subject: configuration.mailFields.subject || "Reset Password",
    text: configuration.mailFields.text || "Reset Password",
    to: userData.mail,
    htmlParams: {
      user: JSON.parse(JSON.stringify(userData)),
      href: configuration.mailFields.generateHref({
        resetTokenId: JSON.parse(JSON.stringify(tokenData.insertedId)),
      }),
      image: configuration.mailFields.image,
      title: configuration.mailFields.title || "Reset Password",
      subTitle: configuration.mailFields.subTitle || "Reset Password",
      content:
        configuration.mailFields.content ||
        "Hello {{params.user.fullName || params.user.name + ' ' + params.user.surName}}, You can reset your account by clicking the button below. ",
      company: configuration.mailFields.company || "2024 © Fire Proton Inc",
      buttonText: configuration.mailFields.buttonText || "Reset My Password",
      ...(configuration.mailFields.customHtmlParams || {}),
    },
  });

  return success(messages.FORGOT_PASSWORD_SUCCESS);
};

export default forgotPassword;
