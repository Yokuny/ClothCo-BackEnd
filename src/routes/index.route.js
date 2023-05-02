import { Router } from "express";
import products from "./products.route.js";

const router = Router();

router.use(products);

export default router;
