import { apiHandler } from "../../../../server/helpers/api-handler";
import { allowedMethod, ServerError, Success } from "../../../../server/helpers/requestValidators";
import { getUser } from "../../../../server/helpers/get-user";
import prisma from "../../../../server/lib/prisma";
import { rgbToHex } from "@mui/system";

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "GET");

  const { user } = await getUser(req);

  try {
    const categories = await prisma.category.findMany({
      where: {
        owner_id: user.id,
        category_type: "expense",
      },
      select: {
        id: true,
        title: true,
      },
    });
    if (categories.length) {
      const data = await Promise.all(
        categories.map(async (c) => {
          const transaction = await prisma.transaction.aggregate({
            where: {
              category_id: c.id,
            },
            _sum: {
              amount: true,
            },
          });
          return { id: c.id, amount: transaction._sum.amount, title: c.title };
        })
      );

      const total_expenses = data?.reduce((a, b) => {
        return a + b.amount;
      }, 0);
      const calc_expenses = data
        ?.filter((d) => d.amount > 0)
        ?.map((i) => {
          return { ...i, amount: Math.round((i.amount / total_expenses) * 100), colors: getRandomColors() };
        });
      return Success(res, { calc_expenses });
    } else {
      return Success(res, {});
    }
  } catch (error) {
    return ServerError(res, error);
  }
}

function getRandomColors() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  while (r < 190 && g < 190 && b < 190) {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
  }
  // return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return rgbToHex(`rgb(${r}, ${g}, ${g})`);
}
