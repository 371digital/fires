import { FireApiResponseMessage } from "371fire";
import messages from "messages";
import bcrypt from "bcrypt";
import * as jwt from "jwt";

const { error, success } = FireApiResponseMessage();

const register = async (
  { query, body, params },
  {},
  { configuration, connection }
) => {
  const userModel = connection.collection("users");
  const allRequestParameters = {
    ...query,
    ...body,
    ...params,
  };

  const data = {};

  Object.keys(configuration).forEach((key) => {
    if (configuration[key]?.active) {
      data[key] = allRequestParameters[key];
    }
  });

  const uniqueFields = [
    {
      key: "userName",
      error: "USER_NAME_EXIST",
    },
    {
      key: "mail",
      error: "MAIL_EXIST",
    },
  ];

  for (let index = 0; index < uniqueFields.length; index++) {
    const field = uniqueFields[index];
    const existUser = await userModel.findOne({ [field.key]: data[field.key] });
    if (existUser && existUser !== null)
      return error(messages[field.error], { messageKey: field.error });
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const userData = await userModel.insertOne(data);
  const userTokenResponse = await jwt.generate(
    JSON.parse(JSON.stringify(userData)).insertedId
  );
  if (userTokenResponse.error)
    return error(messages.TOKEN_GENERATION_ERROR, userTokenResponse);

  return success(messages.REGISTER_SUCCESS, {
    userToken: userTokenResponse.token,
  });
};

export default register;
