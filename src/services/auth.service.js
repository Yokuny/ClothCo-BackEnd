import * as repository from "../repository/auth.repository.js";
import bcrypt from "bcrypt";
import { v4 as newToken } from "uuid";

export const registerUser = async ({ name, email, password }) => {
  const user = await repository.findUserByEmail(email);
  if (user) throw new Error("email already exists");

  const cryptPassword = await bcrypt.hash(password, 10);

  const userData = {
    name,
    email,
    password: cryptPassword,
  };

  return repository.registerUser(userData);
};

export const signin = async ({ email, password }) => {
  const user = await repository.findUserByEmail(email);
  if (!user) throw new Error("Email doesn't exists");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Password incorrect");

  const token = newToken();
  await repository.signin(user, token);

  return token;
};
