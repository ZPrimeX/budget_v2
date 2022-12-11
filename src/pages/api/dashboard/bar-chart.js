import { apiHandler } from "../../../../server/helpers/api-handler";
import { allowedMethod, ServerError, Success } from "../../../../server/helpers/requestValidators";
import { getUser } from "../../../../server/helpers/get-user";
import dayjs from "dayjs";

function prepareRawDate(date) {
  const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const numeral_month = months.indexOf(String(date).slice(8, 11).toLowerCase()) + 1;
  const day = String(date).slice(5, 7);
  const year = String(date).slice(12, 16);
  const actualDate = `${day}${numeral_month}${year}`;
  return actualDate;
}

export default apiHandler(handler);

async function handler(req, res) {
  allowedMethod(req, res, "GET");

  const { user } = await getUser(req);

  try {
    const wallets = await prisma.wallet.findMany({
      where: {
        owner_id: user.id,
      },
      select: {
        id: true,
      },
    });

    //? "Thu, 01 Dec 2022"
    const day1 = dayjs(new Date());
    const day2 = dayjs(new Date() - 24 * 60 * 60 * 1000); // 1 day ago from now in milliseconds (24 hours) (60 minutes) (60 seconds) (1000 milliseconds) = 86400000 milliseconds = 1 day
    const day3 = dayjs(new Date() - 2 * 24 * 60 * 60 * 1000);
    const day4 = dayjs(new Date() - 3 * 24 * 60 * 60 * 1000);
    const day5 = dayjs(new Date() - 4 * 24 * 60 * 60 * 1000);
    const day6 = dayjs(new Date() - 5 * 24 * 60 * 60 * 1000);
    const day7 = dayjs(new Date() - 6 * 24 * 60 * 60 * 1000);

    const dates = [
      prepareRawDate(day7),
      prepareRawDate(day6),
      prepareRawDate(day5),
      prepareRawDate(day4),
      prepareRawDate(day3),
      prepareRawDate(day2),
      prepareRawDate(day1),
    ];

    const data = await Promise.all(
      dates.map(async (date) => {
        const income = await prisma.transaction.aggregate({
          where: {
            AND: [
              {
                OR: wallets.map((w) => {
                  return { wallet_id: w.id };
                }),
              },
              {
                category: {
                  category_type: "income",
                },
              },
              {
                raw_date: +date,
              },
            ],
          },
          _sum: {
            amount: true,
          },
        });

        const expense = await prisma.transaction.aggregate({
          where: {
            AND: [
              {
                OR: wallets.map((w) => {
                  return { wallet_id: w.id };
                }),
              },
              {
                category: {
                  category_type: "expense",
                },
              },
              {
                raw_date: +date,
              },
            ],
          },
          _sum: {
            amount: true,
          },
        });
        return { income, expense, date: +date };
      })
    );
    return Success(res, { data });
  } catch (error) {
    return ServerError(res, error);
  }
}
