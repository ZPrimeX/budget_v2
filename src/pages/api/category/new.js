import { apiHandler } from "../../../../server/helpers/api-handler";
import { getUser } from "../../../../server/helpers/get-user";
import { allowedMethod, NoData, NoTitle, ServerError, Success } from "../../../../server/helpers/requestValidators";
import prisma from "../../../../server/lib/prisma";

export default apiHandler(handler);

async function handler(req, res) {
  const { user } = await getUser(req);
  allowedMethod(req, res, "POST");

  NoData(req, res);

  NoTitle(req, res);

  try {
    const is_duplicate = await prisma.category.findMany({
      where: {
        AND: [
          {
            title: { equals: req.body.title },
          },
          {
            owner_id: { equals: user.id },
          },
        ],
      },
    });
    if (is_duplicate.length !== 0) {
      return res.status(400).json({ message: "category with this title already exists!" });
    }
    const result = await prisma.category.create({
      data: {
        ...req.body,
        owner_id: user.id,
      },
    });
    Success(res, result);
  } catch (error) {
    return ServerError(res);
  }
}
