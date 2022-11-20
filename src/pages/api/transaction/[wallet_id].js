import { apiHandler } from "../../../../server/helpers/api-handler";
import { allowedMethod, Success } from "../../../../server/helpers/requestValidators";
import prisma from "../../../../server/lib/prisma";

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "GET");

  const { wallet_id } = req.query;

  const transactions = await prisma.transaction.findMany({
    where: {
      wallet_id: wallet_id,
    },
    include: {
      category: true,
    },
  });

  return Success(res, transactions);
}
