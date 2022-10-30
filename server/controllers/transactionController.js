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
  const newTransaction = await prisma.transaction.create({
    data: {
      ...data,
    },
  });
  return newTransaction;
};
