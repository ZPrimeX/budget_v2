// import prisma from "../lib/prisma";

// export const findAll = async (user) => {
//   const data = await prisma.category.findMany({
//     where: {
//       owner_id: user.id,
//     },
//   });
//   return data;
// };

// export const findUnique = async (user, category) => {
//   const categories = await prisma.category.findUnique({
//     where: {
//       owner_id: user.id,
//       id: category.id,
//     },
//   });
//   return categories;
// };

// export const create = async (data, user) => {
//   const newCategory = await prisma.category.create({
//     data: {
//       ...data,
//     },
//   });
// };
