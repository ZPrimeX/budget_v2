import { apiHandler } from "../../../../server/helpers/api-handler";
import { Success } from "../../../../server/helpers/requestValidators";
import prisma from "../../../../server/lib/prisma";

export default apiHandler(handler);

async function handler(req, res) {
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      const foundWallet = await prisma.wallet.findUnique({
        where: { id: id },
      });

      return Success(res, foundWallet);
    case "DELETE":
      try {
        await prisma.transaction.deleteMany({
          where: {
            wallet_id: {
              equals: id,
            },
          },
        });

        await prisma.wallet.delete({
          where: {
            id: id,
          },
        });

        return Success(res, id);
      } catch (error) {
        return res.status(400).json({ message: "Wallet Not Found" });
      }
    default:
      res.status(404).json({ message: "Not Found!" });
  }
}
