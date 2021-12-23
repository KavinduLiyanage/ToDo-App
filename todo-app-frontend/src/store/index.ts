import { configureStore } from "@reduxjs/toolkit";
import todos from "../redux/todo.slice";

export const store = configureStore({
  reducer: {
    todos,
  },
});

export type RootState = ReturnType<typeof store.getState>;
