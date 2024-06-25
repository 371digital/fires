import { FireApiResponseMessage } from "371fire";
import messages from "messages";
import bcrypt from "bcrypt";
import * as jwt from "jwt";

const { error, success } = FireApiResponseMessage();

const login = async (
  { query, body, params },
  {},
  { configuration, connection }
) => {
  if (!configuration.password) {
    return console.log(
      "[FIRE-API-AUTH] Your configuration does not include a password for login, therefore the endpoint will not work!"
    );
  }

  const userModel = connection.collection("users");
  const allRequestParameters = {
    ...query,
    ...body,
    ...params,
  };

  const filterData = {};

  if (configuration.mail) filterData.mail = allRequestParameters.mail;
  if (configuration.userName)
    filterData.userName = allRequestParameters.userName;
  if (configuration.userNameOrMail)
    filterData.$or = [
      { mail: allRequestParameters.userNameOrMail },
      { userName: allRequestParameters.userNameOrMail },
    ];

  const userData = await userModel.findOne(filterData);
  if (!userData)
    return error(messages.USER_NOT_FOUND, { messageKey: "USER_NOT_FOUND" });

  const isPasswordMatching = await bcrypt.compare(
    allRequestParameters.password,
    userData.password
  );
  if (!isPasswordMatching)
    return error(messages.PASSWORD_INCORRECT, {
      messageKey: "PASSWORD_INCORRECT",
    });

  const userTokenResponse = await jwt.generate(
    JSON.parse(JSON.stringify(userData))._id
  );
  if (userTokenResponse.error)
    return error(messages.TOKEN_GENERATION_ERROR, userTokenResponse);

  return success(messages.LOGIN_SUCCESS, {
    userToken: userTokenResponse.token,
  });
};

export default login;
