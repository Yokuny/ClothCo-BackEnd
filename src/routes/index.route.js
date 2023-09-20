import { Router } from "express";
import products from "./products.route.js";
import auth from "./auth.route.js";
import cart from "./cart.route.js";
// import checkout from "./checkout.route.js";

const router = Router();

router.use(products);
router.use(auth);
router.use(cart);
// router.use(checkout);

export default router;
