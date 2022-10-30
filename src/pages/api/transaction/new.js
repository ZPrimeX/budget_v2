import { apiHandler } from "../../../../server/helpers/api-handler";
import { allowedMethod, NoData, ServerError, Success } from "../../../../server/helpers/requestValidators";
import { create } from "../../../../server/controllers/transactionController";

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "POST");

  NoData(req, res);

  try {
    const result = await create(req.body);
    Success(res, result);
  } catch (error) {
    return ServerError(res);
  }
}
