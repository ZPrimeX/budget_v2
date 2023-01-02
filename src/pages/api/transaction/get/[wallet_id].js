import { apiHandler } from "../../../../../server/helpers/api-handler";
import { ServerError, Success } from "../../../../../server/helpers/requestValidators";
import prisma from "../../../../../server/lib/prisma";

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
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
      } catch (error) {
        ServerError(res, error);
      }
    default:
      res.status(404).json({ message: "Transaction Not Found!" });
  }
}
