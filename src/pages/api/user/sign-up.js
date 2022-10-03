import { signUp } from "../../../server/controllers/userController";
import { apiHandler } from "../../../server/helpers/api-handler";
import {
  allowedMethod,
  NoData,
  NoEmail,
  NoPassword,
  NoUsername,
  PasswordLength,
} from "../../../server/helpers/requestValidators";

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "POST");

  NoData(req, res);

  NoUsername(req, res);

  NoEmail(req, res);

  NoPassword(req, res);

  PasswordLength(req, res, 6);

  const result = await signUp(req.body);
  if (result.id) {
    res.status(201).json({ message: "success", body: result });
  }
}
