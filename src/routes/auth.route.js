import { Router } from "express";
import data from "../middlewares/data.middleware.js";
import * as controller from "../controllers/auth.controller.js";
import loginSchema from "../schemas/login.schema.js";
import registerSchema from "../schemas/register.schema.js";

const auth = Router();

auth.post("/login", data(loginSchema), controller.signin);
auth.post("/register", data(registerSchema), controller.registerUser);

export default auth;
