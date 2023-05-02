// import { db } from "../database/database.connection.js";
// import bcrypt from "bcrypt";
// import { v4 as newToken } from "uuid";

export const postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  return res.status(200).send("Login successful");
};
