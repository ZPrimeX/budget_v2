import getConfig from "next/config";
import jwt from "jsonwebtoken";
import { apiHandler } from "../../../../server/helpers/api-handler";
import { base_url } from "../../../../server/helpers/urls";
import prisma from "../../../../server/lib/prisma";

const { serverRuntimeConfig } = getConfig();

export default apiHandler(handler);

async function handler(req, res) {
  const { token } = req.query; //object destructuring
  //   const token = req.query.token;
  if (req.method !== "GET") {
    return res.status(404).json({ message: "url not found" });
  }

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  const decoded = jwt.verify(token, serverRuntimeConfig.secret);

  if (Object.keys(decoded).length === 0) {
    return res.status(401).json({ message: "invalid token" });
  }

  const foundUser = await prisma.user.update({
    where: {
      id: decoded.id,
    },
    data: {
      is_verified: true,
    },
  });

  if (!foundUser) {
    return res.status(404).json({ message: "user not found" });
  }

  return res.redirect(base_url);
}
