import httpStatus from "http-status-codes";
import * as service from "../services/cart.service.js";

export const getCartItem = async (req, res) => {
  const token = req.headers?.authorization.replace("Bearer ", "");

  try {
    const cart = await service.getCartItem(token);

    return res.status(httpStatus.OK).send(cart);
  } catch (err) {
    console.log(err);
    if (err.message === "user not logged in") return res.status(httpStatus.UNAUTHORIZED).send(err.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal server error");
  }
};

export const postCartItem = async (req, res) => {
  const token = req.headers?.authorization.replace("Bearer ", "");
  const { productId, quantity } = req.body;

  try {
    await service.postCartItem(token, productId, quantity);

    return res.status(httpStatus.CREATED).send("item added to cart");
  } catch (err) {
    console.log(err);
    if (err.message === "user not logged in") return res.status(httpStatus.UNAUTHORIZED).send(err.message);
    if (err.message === "invalid product id") return res.status(httpStatus.BAD_REQUEST).send(err.message);
    if (err.message === "invalid quantity") return res.status(httpStatus.BAD_REQUEST).send(err.message);
    if (err.message === "product not found") return res.status(httpStatus.NOT_FOUND).send(err.message);
    return res.status(500).send("server error");
  }
};
