import { forgotPassword } from "../../../../server/controllers/userController";
import { apiHandler } from "../../../../server/helpers/api-handler";
import sgMail from "@sendgrid/mail";
import { base_url } from "../../../../server/helpers/urls";

export default apiHandler(handler);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = (userEmail, token) => {
  return {
    to: userEmail, // Change to your recipient
    from: "shahmansurov1001@gmail.com", // Change to your verified sender
    subject: `Reset password`,
    text: "You have requested to reset your password for Budget App.",
    html: `<div><p>To change your password </p><a href="${base_url}reset-password?token=${token}">click this link</a></div>`,
  };
};

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "url not found" });
  }
  if (!req.body.email) {
    return res.status(400).json({ message: "no email" });
  }

  const result = await forgotPassword(req.body.email);

  if (result.message === "error") {
    return res.status(500).json({ message: "error" });
  }

  const message = msg(req.body.email, result.token);
  try {
    await sgMail.send(message);
  } catch (error) {
    throw new Error(error);
  }

  return res.status(201).json({ message: "success" });
}
