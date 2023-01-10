import sgMail from "@sendgrid/mail";
import { apiHandler } from "../../../../server/helpers/api-handler";
import { getUser } from "../../../../server/helpers/get-user";
import { resetPassword } from "../../../../server/controllers/userController";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = (userEmail, username) => {
  return {
    to: userEmail, // Change to your recipient
    from: "shahmansurov1001@gmail.com", // Change to your verified sender
    subject: `You have changed your password, ${username}!`,
    text: "You have successfully changed your password.",
    html: "<strong>Have fun!</strong>",
  };
};

export default apiHandler(handler);

async function handler(req, res) {
  const { user } = await getUser(req);
  if (req.method !== "PATCH") {
    res.status(404).json({ message: "url not found" });
  }
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "no data sent" });
  }
  if (!req.body.password) {
    res.status(400).json({ message: "no password" });
  }
  if (req.body.password.length < 6) {
    res.status(400).json({ message: "password must be at least 6 characters long!" });
  }
  const result = await resetPassword(req.body.password, user.email);
  if (result?.message === "success") {
    res.status(201).json({ message: "success" });
    const message = msg(result.user.email, result.user.username);
    sgMail
      .send(message)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
