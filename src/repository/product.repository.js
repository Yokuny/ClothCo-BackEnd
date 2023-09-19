import { db } from "../database/database.connection.js";

export const getAllProducts = () => {
  const options = { projection: { description: 0, color: 0, type: 0, quantity: 0 } };

  return db.collection("products").find({}, options).toArray();
};

export const getOneProduct = (id) => {
  return db.collection("products").find({ _id: id }).toArray();
};
