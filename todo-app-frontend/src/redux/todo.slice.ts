import { createSlice } from "@reduxjs/toolkit";
import {
  createTodoAsync,
  deleteTodosAsync,
  fetchTodosAsync,
  updateTodoAsync,
} from "./todo.thunk";

export interface TodoState {
  fetchTodos: {
    loading: boolean;
    data: null | Todo[];
    error: StateErrorType;
  };
  addTodo: {
    loading: boolean;
    data: null | Todo;
    error: StateErrorType;
  };
  updateTodoStatus: {
    loading: boolean;
    data: null | Todo;
    error: StateErrorType;
  };
  deleteTodo: {
    loading: boolean;
    data: null | string;
    error: StateErrorType;
  };
}

const initialState: TodoState = {
  fetchTodos: {
    loading: false,
    data: null,
    error: null,
  },
  addTodo: {
    loading: false,
    data: null,
    error: null,
  },
  updateTodoStatus: {
    loading: false,
    data: null,
    error: null,
  },
  deleteTodo: {
    loading: false,
    data: null,
    error: null,
  },
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    resetFetchTodos: (state) => {
      state.fetchTodos = initialState.fetchTodos;
    },
    resetAddTodos: (state) => {
      state.addTodo = initialState.addTodo;
    },
    resetUpdateTodos: (state) => {
      state.updateTodoStatus = initialState.updateTodoStatus;
    },
    resetDeleteTodos: (state) => {
      state.deleteTodo = initialState.deleteTodo;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodosAsync.pending, (state, action) => {
      state.fetchTodos.loading = true;
      state.fetchTodos.data = null;
      state.fetchTodos.error = null;
    });

    builder.addCase(fetchTodosAsync.fulfilled, (state, action) => {
      state.fetchTodos.loading = false;
      state.fetchTodos.data = action.payload as Todo[];
      state.fetchTodos.error = null;
    });

    builder.addCase(fetchTodosAsync.rejected, (state, action) => {
      state.fetchTodos.loading = false;
      state.fetchTodos.data = null;
      state.fetchTodos.error = action.payload as string;
    });

    builder.addCase(createTodoAsync.pending, (state, action) => {
      state.addTodo.loading = true;
      state.addTodo.data = null;
      state.addTodo.error = null;
    });

    builder.addCase(createTodoAsync.fulfilled, (state, action) => {
      state.addTodo.loading = false;
      state.addTodo.data = action.payload as Todo;
      state.addTodo.error = null;
      state.fetchTodos.data?.push(action.payload as Todo);
    });

    builder.addCase(createTodoAsync.rejected, (state, action) => {
      state.addTodo.loading = false;
      state.addTodo.data = null;
      state.addTodo.error = action.payload as string;
    });

    builder.addCase(updateTodoAsync.pending, (state, action) => {
      state.updateTodoStatus.loading = true;
      state.updateTodoStatus.data = null;
      state.updateTodoStatus.error = null;
    });

    builder.addCase(updateTodoAsync.fulfilled, (state, action) => {
      const updatedTodo = action.payload as Todo;
      console.log(updatedTodo);

      state.updateTodoStatus.loading = false;
      state.updateTodoStatus.data = updatedTodo;
      state.updateTodoStatus.error = null;
      state.fetchTodos.data =
        state.fetchTodos.data?.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        ) || null;
    });

    builder.addCase(updateTodoAsync.rejected, (state, action) => {
      state.updateTodoStatus.loading = false;
      state.updateTodoStatus.data = null;
      state.updateTodoStatus.error = action.payload as string;
    });

    builder.addCase(deleteTodosAsync.pending, (state, action) => {
      state.deleteTodo.loading = true;
      state.deleteTodo.data = null;
      state.deleteTodo.error = null;
    });

    builder.addCase(deleteTodosAsync.fulfilled, (state, action) => {
      const deletedId = action.payload as string;

      state.deleteTodo.loading = false;
      state.deleteTodo.data = deletedId;
      state.deleteTodo.error = null;
      state.fetchTodos.data =
        state.fetchTodos.data?.filter((todo) => todo._id !== deletedId) || null;
    });

    builder.addCase(deleteTodosAsync.rejected, (state, action) => {
      state.deleteTodo.loading = false;
      state.deleteTodo.data = null;
      state.deleteTodo.error = action.payload as string;
    });
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
