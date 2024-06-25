import { FireApiResponseMessage, FireMongo } from "371fire";
import messages from "messages";
import bcrypt from "bcrypt";

const { Types } = FireMongo();
const { error, success } = FireApiResponseMessage();

const resetPassword = async (
  { query, body, params },
  {},
  { configuration, connection }
) => {
  if (!configuration.resetTokenId) {
    return console.log(
      "[FIRE-API-AUTH] Your configuration does not include a reset token for reset password, therefore the endpoint will not work!"
    );
  }
  const allRequestParameters = {
    ...query,
    ...body,
    ...params,
  };
  const userModel = connection.collection("users");
  const resetTokenModel = connection.collection("reset.tokens");

  const findedTokenData = await resetTokenModel
    .find({
      _id: new Types.ObjectId(allRequestParameters.resetTokenId),
      completed: false,
    })
    .toArray();

  if (!findedTokenData.length)
    return error(messages.RESET_TOKEN_DATA_NOT_FOUND, {
      messageKey: "RESET_TOKEN_DATA_NOT_FOUND",
    });

  const newPassword = await bcrypt.hash(allRequestParameters.password, 10);
  await userModel.updateOne(
    {
      _id: new Types.ObjectId(findedTokenData[0].user),
    },
    { $set: { password: newPassword } }
  );
  resetTokenModel.updateOne(
    {
      _id: new Types.ObjectId(allRequestParameters.resetTokenId),
      completed: false,
    },
    { $set: { completed: true } }
  );
  return success(messages.RESET_PASSWORD_SUCCESS);
};

export default resetPassword;
