import { NoFirstName, NoLastName } from "../../../../server/helpers/requestValidators";
import { signUp } from "../../../../server/controllers/userController";
import { apiHandler } from "../../../../server/helpers/api-handler";
import {
  allowedMethod,
  NoData,
  NoEmail,
  NoPassword,
  PasswordLength,
} from "../../../../server/helpers/requestValidators";

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "POST");

  NoData(req, res);

  NoFirstName(req, res);

  NoLastName(req, res);

  NoEmail(req, res);

  NoPassword(req, res);

  PasswordLength(req, res, 6);

  const result = await signUp(req.body);

  if (result.message === "error") {
    res.status(401).json({ message: result.data });
  }
  res.status(201).json({ message: "success", body: result.data });
}
