import { apiHandler } from "../../../server/helpers/api-handler";
import { getUser } from "../../../server/helpers/get-user";
import {
  allowedMethod,
  Success,
} from "../../../server/helpers/requestValidators";
import prisma from "../../../server/lib/prisma";

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "GET");
  const { user } = await getUser(req);

  const userWallets = await prisma.wallet.findMany({
    where: { owner_id: user.id },
  });

  return Success(res, userWallets);
}
