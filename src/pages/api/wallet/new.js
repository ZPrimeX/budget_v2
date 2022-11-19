import { apiHandler } from "../../../../server/helpers/api-handler";
import { getUser } from "../../../../server/helpers/get-user";
import { allowedMethod, NoData, NoTitle, ServerError, Success } from "../../../../server/helpers/requestValidators";
import { create } from "../../../../server/controllers/walletController";

export default apiHandler(handler);

async function handler(req, res) {
  const { user } = await getUser(req);
  allowedMethod(req, res, "POST");

  NoData(req, res);

  NoTitle(req, res);

  try {
    const result = await create(req.body, user);
    Success(res, result);
  } catch (error) {
    console.log(error);
    return ServerError(res, error);
  }
}
