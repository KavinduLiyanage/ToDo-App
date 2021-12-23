import { createAsyncThunk } from "@reduxjs/toolkit";
import todoApi from "./todo.api";

export const fetchTodosAsync = createAsyncThunk(
  "todos/fetch",
  async (payload, thunkAPI) => {
    try {
      const response = await todoApi.fetchAllTodos();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message as string);
    }
  }
);

export const createTodoAsync = createAsyncThunk(
  "todos/create",
  async (payload: CreateTodoPayload, thunkAPI) => {
    try {
      const response = await todoApi.postTodo(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message as string);
    }
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todos/update",
  async (payload: UpdateTodoPayload, thunkAPI) => {
    try {
      const response = await todoApi.putTodo(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message as string);
    }
  }
);

export const deleteTodosAsync = createAsyncThunk(
  "todos/delete",
  async (payload: DeleteTodoPayload, thunkAPI) => {
    try {
      await todoApi.deleteTodo(payload);
      return payload.todoId;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message as string);
    }
  }
);
