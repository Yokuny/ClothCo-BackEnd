import * as repository from "../repository/product.repository.js";
import { ObjectId } from "mongodb";

export const getAllProducts = () => {
  return repository.getAllProducts();
};

export const getOneProduct = async (id) => {
  if (!id) throw new Error("id not found");
  if (!ObjectId.isValid(id)) throw new Error("invalid id");

  const objId = new ObjectId(id);

  const product = await repository.getOneProduct(objId);
  if (!product.length) throw new Error("product not found");

  return product[0];
};
