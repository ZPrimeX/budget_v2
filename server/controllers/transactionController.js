import prisma from "../lib/prisma";

export const findAll = async (wallet) => {
  const data = await prisma.transaction.findMany({
    where: {
      owner_id: wallet.id,
    },
  });
  return data;
};

export const findUnique = async (wallet, transaction) => {
  const transactions = await prisma.transaction.findUnique({
    where: {
      owner_id: wallet.id,
      id: transaction.id,
    },
  });
  return transactions;
};

export const create = async (data, wallet) => {
  const newTransaction = await prisma.transaction.create({
    data: {
      ...data,
      owner_id: wallet.id,
    },
  });
  return newTransaction;
};
