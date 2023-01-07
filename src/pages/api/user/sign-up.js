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
import sgMail from "@sendgrid/mail";
import { welcome } from "../../../../server/sengrid_template/welcome_template";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = (userEmail, first_name, token) => {
  return {
    to: userEmail, // Change to your recipient
    from: "shahmansurov1001@gmail.com", // Change to your verified sender
    subject: `Welcome ${first_name}!`,
    text: "You have successfully signed up.",
    html: welcome(first_name),
  };
};

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
    res.status(401).json({ message: result });
  }
  res.status(201).json({ message: "success", body: result });
  const message = msg(req.body.email, req.body.first_name, result.token);
  sgMail
    .send(message)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}
