import { apiHandler } from "../../../../server/helpers/api-handler";
import { allowedMethod, Success } from "../../../../server/helpers/requestValidators";
import prisma from "../../../../server/lib/prisma";

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "GET");

  const { id } = req.query;

  const wallet = await prisma.wallet.findUnique({
    where: { id: id },
  });

  return Success(res, wallet);
}
