import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error);
  res.status(500).json({ mensage: "Internal server error." });
};

export default errorHandler;
