import prisma from "../lib/prisma";

export const findAll = async (user) => {
  const data = await prisma.wallet.findMany({
    where: {
      owner_id: user.id,
    },
  });
  return data;
};

export const findUnique = async (user, wallet) => {
  const wallets = await prisma.wallet.findUnique({
    where: {
      owner_id: user.id,
      id: wallet.id,
    },
  });
  return wallets;
};

export const create = async (data, user) => {
  const newWallet = await prisma.wallet.create({
    data: {
      ...data,
      initial_balance: +data.initial_balance,
      balance: +data.initial_balance,
      income: 0,
      expense: 0,
      owner_id: user.id,
    },
  });
  return newWallet;
};
