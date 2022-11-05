import prisma from "../../../../server/lib/prisma";
import { OAuth2Client } from "google-auth-library";
import { apiHandler } from "../../../../server/helpers/api-handler";
import { allowedMethod } from "../../../../server/helpers/requestValidators";
import { GOOGLE_CLOUD_ID } from "../../../utils/lib";
import jwt from "jsonwebtoken";
import getConfig from "next/config";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const { serverRuntimeConfig } = getConfig();

const saltRounds = 10;

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "POST");

  const client = new OAuth2Client(GOOGLE_CLOUD_ID);

  const { id_token } = req.body;

  const ticket = await client.verifyIdToken({ idToken: id_token, audience: GOOGLE_CLOUD_ID });

  // extract user info from google response

  const payload = ticket.getPayload();

  const user_id = payload["sub"];

  const foundUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
      google_id: user_id,
    },
  });

  if (foundUser) {
    const token = jwt.sign({ id: foundUser.id }, serverRuntimeConfig.secret);
    const success = {
      ...foundUser,
      token,
    };
    return res.status(201).json({ message: "success", body: success });
  } else {
    const hashedPassword = await bcrypt.hash(uuid(), saltRounds);
    const user = await prisma.user.create({
      data: {
        first_name: payload.given_name,
        last_name: payload.family_name,
        email: payload.email,
        avatar: payload.picture,
        google_id: user_id,
        password: hashedPassword,
      },
    });
    const token = jwt.sign({ id: user.id }, serverRuntimeConfig.secret);
    return res.status(201).json({ message: "success", body: { ...user, token } });
  }
}
