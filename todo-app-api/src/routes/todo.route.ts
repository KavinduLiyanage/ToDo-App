import { celebrate } from "celebrate";
import express from "express";
import TodoController from "../controllers/todo.controller";
import todoSchema from "../validations/todo.validations";

const router = express.Router();
const todoController = new TodoController();

router.get("/", todoController.getAllTodo);
router.post("/", celebrate(todoSchema.postTodo), todoController.postTodo);
router.put("/:id", celebrate(todoSchema.putTodo), todoController.putTodo);
router.delete(
  "/:id",
  celebrate(todoSchema.deleteTodo),
  todoController.deleteTodo
);

export default router;
