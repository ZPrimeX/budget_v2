import { apiHandler } from "../../../../server/helpers/api-handler";
import { ServerError, Success } from "../../../../server/helpers/requestValidators";
import prisma from "../../../../server/lib/prisma";

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
    case "PATCH":
      try {
        const { id } = req.query;
        const transaction = await prisma.transaction.patch({
          where: {
            id: id,
          },
          data: req.body,
        });
        return Success(res, transaction);
      } catch (error) {
        ServerError(res, error);
      }
    case "DELETE":
      try {
        const { id } = req.query;
        await prisma.transaction.delete({
          where: {
            id: id,
          },
        });
        return Success(res, id);
      } catch (error) {
        return res.status(400).json({ message: "Transaction Not Found!" });
      }
    default:
      res.status(404).json({ message: "Transaction Not Found!" });
  }
}
