import { db } from "../database/database.connection.js";

export const userByToken = (token) => {
  return db.collection("users").findOne({ token }, { projection: { _id: true } });
};

export const getProductsQuantity = async (products) => {
  return db.collection("products").find({ $or: products }).sort({ _id: 1 }).toArray();
};

export const updateStock = async (updates) => {
  return db.collection("products").bulkWrite(updates);
};

export const postOrder = async (order) => {
  return db.collection("orders").insertOne(order);
};

export const getOrders = async (id) => {
  return db.collection("orders").find({ userId: id }).toArray();
};

export const getOneOrder = async (_id, id) => {
  return db.collection("orders").findOne({ _id: new ObjectId(id), userId: _id });
};
