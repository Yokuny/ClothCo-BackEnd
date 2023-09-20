import * as service from "../services/product.service.js";
import httpStatus from "http-status-codes";

export const getAllProducts = async (req, res) => {
  try {
    const data = await service.getAllProducts();

    return res.status(httpStatus.OK).send(data);
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const data = await service.getOneProduct(req.params);

    return res.status(httpStatus.OK).send(data);
  } catch (err) {
    console.log(err);
    if (err.message === "id not found") return res.status(httpStatus.FORBIDDEN).send(err.message);
    if (err.message === "invalid id") return res.status(httpStatus.BAD_REQUEST).send(err.message);
    if (err.message === "product not found") return res.status(httpStatus.NOT_FOUND).send(err.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};
