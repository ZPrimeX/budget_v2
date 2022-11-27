import { updateBalance } from "../../../../server/controllers/transactionController";
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
        const editTransaction = await prisma.transaction.update({ where: { id: data.id }, data: data.body });

        await updateBalance(editTransaction.category_id, data);

        return Success(res, editTransaction);
      } catch (error) {
        ServerError(res, error);
      }
    case "DELETE":
      try {
        const deletedTransaction = await prisma.transaction.delete({ where: { id: data.id } });

        await updateBalance(deletedTransaction.category_id, data);

        return Success(res, deletedTransaction.id);
      } catch (error) {
        return res.status(400).json({ message: "Transaction Not Found!" });
      }
    default:
      res.status(404).json({ message: "Transaction Not Found!" });
  }
}
