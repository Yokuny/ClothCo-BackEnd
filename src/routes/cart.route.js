import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/cart.controller.js";

const router = Router();

router.get("/cart", auth, controller.getCartItem);
router.post("/cart", auth, controller.postCartItem);

export default router;
