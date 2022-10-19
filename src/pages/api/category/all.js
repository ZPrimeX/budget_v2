import { apiHandler } from "../../../../server/helpers/api-handler";
import { getUser } from "../../../../server/helpers/get-user";
import { allowedMethod, Success } from "../../../../server/helpers/requestValidators";
import prisma from "../../../../server/lib/prisma";

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "GET");
  const { user } = await getUser(req);

  const userCategories = await prisma.category.findMany({
    where: {
      OR: [
        {
          is_built_in: { equals: true },
        },
        {
          owner_id: { equals: user.id },
        },
      ],
    },
  });

  return Success(res, userCategories);
}
