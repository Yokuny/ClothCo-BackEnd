import { db } from "../database/database.connection.js";

export const registerUser = (newUser) => {
  return db.collection("users").insertOne(newUser);
};

export const findUserByEmail = (email) => {
  return db.collection("users").findOne({ email: email });
};

export const signin = (user, token) => {
  return db.collection("users").updateOne(user, { $set: { token: token } });
};
