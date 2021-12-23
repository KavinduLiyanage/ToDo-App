import { Request, Response, NextFunction } from "express";
import {
  TODO_DELETE_ERROR,
  TODO_DELETE_SUCCESS,
  TODO_FETCH_ERROR,
  TODO_FETCH_SUCCESS,
  TODO_POST_ERROR,
  TODO_POST_SUCCESS,
  TODO_PUT_ERROR,
  TODO_PUT_SUCCESS,
} from "../constants/todo.constants";
import TodoService from "../services/todo.service";
import { IResponse } from "../types";

export default class TodoController {
  private static todoService = new TodoService();

  async postTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, endDate } = req.body;
      const createdTodo = await TodoController.todoService.createTodo(
        title,
        endDate
      );

      const response: IResponse = {
        message: TODO_POST_SUCCESS,
        body: createdTodo,
      };
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ message: TODO_POST_ERROR, error });
    }
  }

  async getAllTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const todoList = await TodoController.todoService.findAllTodos();

      const response: IResponse = {
        message: TODO_FETCH_SUCCESS,
        body: todoList,
      };
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: TODO_FETCH_ERROR, error });
    }
  }

  async putTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, endDate, status } = req.body;
      const { id } = req.params;
      const updatedTodo = await TodoController.todoService.updateTodo(id, {
        title,
        endDate,
        status,
      });

      const response: IResponse = {
        message: TODO_PUT_SUCCESS,
        body: updatedTodo,
      };
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ message: TODO_PUT_ERROR, error });
    }
  }

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedTodo = await TodoController.todoService.deleteTodo(id);

      const response: IResponse = {
        message: TODO_DELETE_SUCCESS,
        body: deletedTodo,
      };
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: TODO_DELETE_ERROR, error });
    }
  }
}
