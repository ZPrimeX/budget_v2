import { validateSignUp } from "../../../server/controllers/userController";
import { apiHandler } from "../../../server/helpers/api-handler";
import { allowedMethod } from "../../../server/helpers/requestValidators";

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "POST");

  const result = await validateSignUp(req.body);

  if (result.message === "error") {
    return res
      .status(200)
      .json({ message: "error", description: result.description });
  }

  res.status(201).json({ message: "success" });
}
