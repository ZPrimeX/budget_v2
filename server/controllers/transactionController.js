import prisma from "../lib/prisma";

export const create = async (data) => {
  try {
    const newTransaction = await prisma.transaction.create({
      data: data,
      include: {
        category: true,
      },
    });

    const category = await prisma.category.findUnique({ where: { id: data.category_id } });

    let payload;
    if (category.category_type === "expense") {
      payload = { balance: { decrement: data.amount }, expense: { increment: data.amount } };
    } else {
      payload = { balance: { increment: data.amount }, income: { increment: data.amount } };
    }

    await prisma.wallet.update({
      where: { id: data.wallet_id },
      data: payload,
    });

    return newTransaction;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateBalance = async (category_id, data) => {
  const category = await prisma.category.findUnique({ where: { id: category_id } });
  let payload;
  if (category.category_type === "expense") {
    payload = { balance: { decrement: data.amount }, expense: { increment: data.amount } };
  } else {
    payload = { balance: { increment: data.amount }, income: { increment: data.amount } };
  }

  await prisma.wallet.update({
    where: { id: data.wallet_id },
    data: payload,
  });
};
