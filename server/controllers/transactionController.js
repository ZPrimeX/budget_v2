import prisma from "../lib/prisma";

export const findAll = async (wallet) => {
  const data = await prisma.transaction.findMany({
    where: {
      wallet_id: wallet.id,
    },
  });
  return data;
};

export const findUnique = async (transaction) => {
  const transactions = await prisma.transaction.findUnique({
    where: {
      id: transaction.id,
    },
  });
  return transactions;
};

export const create = async (data) => {
  try {
    const newTransaction = await prisma.transaction.create({
      data: data,
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
    // TODO: Do the same for all controllers
    throw new Error(error);
  }
};

//? You can use this for edit transaction as well :)
// const category = await prisma.category.findUnique({ where: { id: data.category_id } });

//     let payload;
//     if (category.category_type === "expense") {
//       payload = { balance: { decrement: data.amount }, expense: { increment: data.value } };
//     } else {
//       payload = { balance: { increment: data.amount }, income: { increment: data.value } };
//     }

//     await prisma.wallet.update({
//       where: { id: data.wallet_id },
//       data: payload,
//     });
