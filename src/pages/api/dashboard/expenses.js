import { apiHandler } from "../../../../server/helpers/api-handler";
import { allowedMethod, ServerError, Success } from "../../../../server/helpers/requestValidators";
import { getUser } from "../../../../server/helpers/get-user";

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "GET");

  const { user } = await getUser(req);

  try {
    const aggregations = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
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
