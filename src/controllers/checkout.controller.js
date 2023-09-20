import * as service from "../services/checkout.service.js";
import httpStatus from "http-status-codes";

export const postOrder = async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  const products = req.body?.products;
  

  try {
    const orderId = await service.postOrder(token, products);

    return res.status(httpStatus.CREATED).send({ orderId });
  } catch (err) {
    console.log(err);
    if (err.message === "products is required") return res.status(httpStatus.BAD_REQUEST).send(err.message);
    if (err.message === "user not logged in") return res.status(httpStatus.UNAUTHORIZED).send(err.message);
    if (err.message.includes("product")) return res.status(httpStatus.BAD_REQUEST).send(err.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("server error");
  }
};

export const getOrders = async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    const orders = await service.getOrders(token);

    return res.status(httpStatus.OK).send(orders);
  } catch (err) {
    console.log(err);
    if (err.message === "user not logged in") return res.status(httpStatus.UNAUTHORIZED).send(err.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("server error");
  }
};

export const getOneOrder = async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  const { id } = req.params;

  try {
    const order = await service.getOneOrder(token, id);

    return res.status(httpStatus.OK).send(order);
  } catch (err) {
    console.log(err);
    if (err.message === "user not logged in") return res.status(401).send(err.message);
    if (err.message === "ID inválido") return res.status(401).send(err.message);
    return res.status(500).send("server error");
  }
};
