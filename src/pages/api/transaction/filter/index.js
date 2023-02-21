import { apiHandler } from "../../../../../server/helpers/api-handler";
import { allowedMethod, NoData, ServerError, Success } from "../../../../../server/helpers/requestValidators";
import prisma from "../../../../../server/lib/prisma";

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "POST");

  NoData(req, res);

  const { category_type, ordering } = req.body;

  try {
    const result = await prisma.transaction.findMany({
      where: {
        AND: [
          {
            category_type: category_type,
          },
        ],
      },
      orderBy: ordering,
    });
    Success(res, result);
  } catch (error) {
    return ServerError(res, error);
  }
}
