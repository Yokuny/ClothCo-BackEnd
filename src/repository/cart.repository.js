import { db } from "../database/database.connection.js";

export const getUserByToken = (token) => {
  return db.collection("users").find({ token: token }).toArray();
};

export const getProductById = (id) => {
  return db.collection("products").find({ _id: id }).toArray();
};

export const postCartItem = (token, order) => {
  return db.collection("users").updateOne({ token }, { $push: { cart: order } });
};

export const updateCartItem = (token, productId, value) => {
  return db
    .collection("users")
    .updateOne({ token, "cart.productId": productId }, { $set: { "cart.$.quantity": value } });
};
