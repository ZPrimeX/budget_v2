import { apiHandler } from "../../../../server/helpers/api-handler";
import prisma from "../../../../server/lib/prisma";
import { getUser } from "../../../../server/helpers/get-user";
import { allowedMethod, ServerError, Success } from "../../../../server/helpers/requestValidators";

export default apiHandler(handler);

async function handler(req, res) {
  try {
    allowedMethod(req, res, "PATCH");
    const { user } = await getUser(req);

    if (!user) {
      return res.status(401).json({ message: "error", description: "Forbidden" });
    }

    const { id } = req.query;

    const category = await prisma.category.findUnique({ where: { id: id } });

    if (category.owner_id !== user.id) {
      return res.status(401).json({ message: "error", description: "Forbidden" });
    }

    const editedCategory = await prisma.category.update({ where: { id: id }, data: req.body });

    return Success(res, editedCategory);
  } catch (error) {
    return ServerError(res);
  }
}
