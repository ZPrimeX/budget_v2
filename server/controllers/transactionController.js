import prisma from "../lib/prisma";

export const findAll = async (wallet) => {
  const data = await prisma.transaction.findMany({
    where: {
      wallet_id: wallet.id,
    },
    include: {
      category: true,
    },
  });
  return data;
};

export const findUnique = async (transaction) => {
  const transactions = await prisma.transaction.findUnique({
    where: {
      id: transaction.id,
    },
    include: {
      category: true,
    },
  });
  return transactions;
};

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

export const edit = async (data) => {
  try {
    const editTransaction = await prisma.transaction.update({ where: { id: data.id }, data: data.body });

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

    return editTransaction;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTransaction = async (data) => {
  try {
    const deletedTransaction = await prisma.transaction.delete({ where: { id: data.id } });

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

    return deletedTransaction.id;
  } catch (error) {
    throw new Error(error);
  }
};
