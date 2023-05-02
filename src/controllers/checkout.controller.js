// import { db } from "../database/database.connection.js";
// import { ObjectId } from "mongodb";

export const postOrder = async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  console.log(req.body);
};

export const getOrder = async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  return res.send(token);
};

export const getOneOrder = async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  const { id } = req.params;
  return res.send(id);
};
