import express, { Router } from "express";
import TodoRouter from "./todo.route";

export const initRouter = (): Router => {
  const router = express.Router();
  router.use("/todo", TodoRouter);
  return router;
};
