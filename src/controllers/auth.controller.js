import httpStatus from "http-status-codes";
import * as service from "../services/auth.service.js";

export const registerUser = async (req, res) => {
  try {
    await service.registerUser(req.body);

    return res.status(httpStatus.CREATED).send("User created");
  } catch (err) {
    if (err.message === "email already exists") return res.status(httpStatus.BAD_REQUEST).send(err.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal server error");
  }
};

export const signin = async (req, res) => {
  try {
    const token = await service.signin(req.body);

    return res.status(httpStatus.ACCEPTED).send(token);
  } catch (err) {
    console.log(err);
    if (err.message === "Email doesn't exists") return res.status(httpStatus.BAD_REQUEST).send(err.message);
    if (err.message === "Password incorrect") return res.status(httpStatus.FORBIDDEN).send(err.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal server error");
  }
};
