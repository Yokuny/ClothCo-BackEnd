import * as repository from "../repository/cart.repository.js";
import { ObjectId } from "mongodb";

const checkIfUserIsLoggedIn = async (token) => {
  if (!token) throw new Error("user not logged in");

  const user = await repository.getUserByToken(token);
  if (!user.length) throw new Error("user not logged in");

  return user;
};

export const getCartItem = async (token) => {
  const [user] = await checkIfUserIsLoggedIn(token);

  return user.cart;
};

export const postCartItem = async (token, productId, quantity) => {
  if (!ObjectId.isValid(productId)) throw new Error("invalid product id");
  if (quantity < 1 || !quantity) throw new Error("invalid quantity");

  const [user] = await checkIfUserIsLoggedIn(token);

  const objId = new ObjectId(productId);
  const product = await repository.getProductById(objId);
  if (!product.length) throw new Error("product not found");

  const index = user.cart?.findIndex((item) => item.productId === productId);

  if (index === -1 || index === undefined) {
    const order = { productId, quantity, title: product.title, price: product.price, img: product.img };
    await repository.postCartItem(token, order);
  } else {
    const sum = parseInt(user.cart[index].quantity) + parseInt(quantity);
    await repository.updateCartItem(token, productId, sum);
  }
};
