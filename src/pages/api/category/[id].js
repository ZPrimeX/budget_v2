import { apiHandler } from "../../../../server/helpers/api-handler";
import prisma from "../../../../server/lib/prisma";
import { getUser } from "../../../../server/helpers/get-user";
import { ServerError, Success } from "../../../../server/helpers/requestValidators";

export default apiHandler(handler);

async function handler(req, res) {
  if (req.method === "PATCH") {
    try {
      reqValidator(req, res);
      const editedCategory = await prisma.category.update({ where: { id: id }, data: req.body });

      return Success(res, editedCategory);
    } catch (error) {
      console.log(error);
      return ServerError(res);
    }
  } else if (req.method === "DELETE") {
    try {
      reqValidator(req, res);
      const deletedCategory = await prisma.category.delete({ where: { id: id } });

      return Success(res, deletedCategory.id);
    } catch (error) {
      return ServerError(res);
    }
  } else {
    return res.status(404).json({ message: "Not found" });
  }
}

async function reqValidator(req, res) {
  const { user } = await getUser(req);

  if (!user) {
    return res.status(401).json({ message: "error", description: "Forbidden" });
  }

  const { id } = req.query;

  const category = await prisma.category.findUnique({ where: { id: id } });

  if (category.owner_id !== user.id) {
    return res.status(401).json({ message: "error", description: "Forbidden" });
  }
}
