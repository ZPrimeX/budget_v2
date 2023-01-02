import { apiHandler } from "../../../../server/helpers/api-handler";
import prisma from "../../../../server/lib/prisma";
import { updateBalance } from "../../../../server/controllers/transactionController";
import { ServerError, Success } from "../../../../server/helpers/requestValidators";

export default apiHandler(handler);

async function handler(req, res) {
  if (req.method === "PATCH") {
    try {
      const editTransaction = await prisma.transaction.update({ where: { id: req.query.id }, data: req.body });

      await updateBalance(editTransaction.category_id, editTransaction);

      return Success(res, editTransaction);
    } catch (error) {
      ServerError(res, error);
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedTransaction = await prisma.transaction.delete({ where: { id: req.query.id } });

      await updateBalance(deletedTransaction.category_id, deletedTransaction);

      return Success(res, deletedTransaction.id);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Transaction Not Found!" });
    }
  } else {
    return res.status(404).json({ message: "Not found" });
  }
}
