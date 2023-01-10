import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import getConfig from "next/config";
import jwt from "jsonwebtoken";

const { serverRuntimeConfig } = getConfig();

const saltRounds = 10;

export const signUp = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  const user = await prisma.user.create({
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email.toLowerCase(),
      password: hashedPassword,
    },
  });
  const token = jwt.sign({ id: user.id }, serverRuntimeConfig.secret);
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    token,
  };
};

export const login = async (data) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    return { message: "error", data: "invalid password" };
  }
  const token = jwt.sign({ id: user.id }, serverRuntimeConfig.secret);

  return {
    data: {
      ...user,
      password: null,
      token,
    },
    message: "success",
  };
};

export const validateSignUp = async (data) => {
  const foundUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (foundUser?.email) {
    return { message: "error", description: "this email is already taken" };
  }
  return { message: "success", description: "" };
};

export const forgotPassword = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) {
    return { message: "not found" };
  }
  const token = jwt.sign({ id: user.id }, serverRuntimeConfig.secret);

  return { message: "success", user, token };
};

export const resetPassword = async (password, email) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.update({
      where: { email: email },
      data: { password: hashedPassword },
    });
    return { message: "success", user };
  } catch (error) {
    console.log(error);
  }
};
