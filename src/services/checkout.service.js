import * as repository from "../repository/checkout.repository.js";
import { ObjectId } from "mongodb";

const userByToken = async (token) => {
  const user = await repository.userByToken(token);
  if (!user) throw new Error("user not logged in");
  return user;
};

export const postOrder = async (token, products) => {
  const user = await userByToken(token);
  if (!products) throw new Error("products is required");

  const productsTable = products.map((product) => ({ _id: new ObjectId(product.id) }));
  const stock = await repository.getProductsQuantity(productsTable);

  const orderObj = { products: [], total: 0, userId: user._id };
  const updates = [];

  for (let i = 0; i < stock.length; i++) {
    if (products[i].quantity > stock[i].quantity && products[i]._id == stock[i]._id.toString()) {
      throw new Error(`product ${stock[i].title} has insufficient stock`);
    }

    const newQuantity = stock[i].quantity - products[i].quantity;

    updates.push({
      updateOne: { filter: { _id: stock[i]._id }, update: { $set: { quantity: newQuantity } } },
    });

    orderObj.products.push({ title: stock[i].title, quantity: products[i].quantity, price: stock[i].price });
    orderObj.total += products[i].quantity * stock[i].price;
  }

  await repository.updateStock(updates);

  const { insertedId } = await repository.postOrder(orderObj);
  return insertedId;
};

export const getOrders = async (token) => {
  const user = await userByToken(token);
  return repository.getOrders(user._id);
};

export const getOneOrder = async (token, id) => {
  if (!ObjectId.isValid(id)) throw new Error("ID inválido");
  const user = await userByToken(token);
  return repository.getOneOrder(user._id, id);
};
