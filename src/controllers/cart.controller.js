// import { db } from "../database/database.connection.js";
// import { ObjectId } from "mongodb";

export const getCartItem = async (req, res) => {
  const token = req.headers?.authorization.replace("Bearer ", "");
  return res.status(200).send(token);
};

export const postCartItem = async (req, res) => {
  const token = req.headers?.authorization.replace("Bearer ", "");
  const { productId, quantity } = req.body;
  return res.status(200).send(token);
};
