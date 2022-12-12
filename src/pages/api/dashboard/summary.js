import { apiHandler } from "../../../../server/helpers/api-handler";
import { allowedMethod, ServerError, Success } from "../../../../server/helpers/requestValidators";
import { getUser } from "../../../../server/helpers/get-user";
import prisma from "../../../../server/lib/prisma";

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "GET");

  const { user } = await getUser(req);

  try {
    const aggregations = await prisma.wallet.aggregate({
      _sum: {
        balance: true,
        income: true,
        expense: true,
      },
      where: {
        owner_id: user.id,
      },
    });
    return Success(res, aggregations);
  } catch (error) {
    return ServerError(res, error);
  }
}
