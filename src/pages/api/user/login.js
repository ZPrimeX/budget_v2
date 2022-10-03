import { login } from "../../../server/controllers/userController";
import { apiHandler } from "../../../server/helpers/api-handler";
import {
  allowedMethod,
  NoData,
  NoEmail,
  NoPassword,
} from "../../../server/helpers/requestValidators";

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "POST");

  NoData(req, res);

  NoEmail(req, res);

  NoPassword(req, res);

  const result = await login(req.body);

  if (result.message === "error") {
    res.status(401).json({ message: result.data });
  }

  res.status(201).json({ message: "success", body: result.data });
}
