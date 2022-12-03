import { apiHandler } from "../../../../server/helpers/api-handler";
import { allowedMethod, ServerError, Success } from "../../../../server/helpers/requestValidators";
import { getUser } from "../../../../server/helpers/get-user";

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "GET");

  const { user } = await getUser(req);

  try {
    const wallets = await prisma.wallet.findMany({
      where: {
        owner_id: user.id,
      },
      select: {
        id: true,
      },
    });

    const incomes = await prisma.transaction.groupBy({
      by: ["day", "month", "year", "raw_date"],
      where: {
        OR: wallets.map((w) => {
          return { wallet_id: w.id };
        }),
        category: {
          category_type: "income",
        },
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        raw_date: "asc",
      },
    });

    const expenses = await prisma.transaction.groupBy({
      by: ["day", "month", "year", "raw_date"],
      where: {
        OR: wallets.map((w) => {
          return { wallet_id: w.id };
        }),
        category: {
          category_type: "expense",
        },
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        raw_date: "asc",
      },
    });

    return Success(res, { expenses, incomes });
  } catch (error) {
    console.log(error);
    return ServerError(res, error);
  }
}
