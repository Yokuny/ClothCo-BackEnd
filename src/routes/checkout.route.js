import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/checkout.controller.js";

const router = Router();

router.get("/checkout", auth, controller.getOrders);
router.get("/checkout/:id", auth, controller.getOneOrder);
router.post("/checkout", auth, controller.postOrder);

export default router;
