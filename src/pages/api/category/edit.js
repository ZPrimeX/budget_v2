import { apiHandler } from "../../../../server/helpers/api-handler";
import prisma from "../../../../server/lib/prisma";
import { getUser } from "../../../../server/helpers/get-user";
import { allowedMethod, Success } from "../../../../server/helpers/requestValidators";

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "PATCH");
  const { user } = await getUser(req);

  const editCategory = await prisma.category.update({});

  return Success(res);
}
