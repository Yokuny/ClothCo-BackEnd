import { Router } from "express";
import { getAllProducts, getOneProduct } from "../controllers/products.controller.js";

const products = Router();
products.get("/", getAllProducts);
products.get("/product/:id", getOneProduct);

export default products;
