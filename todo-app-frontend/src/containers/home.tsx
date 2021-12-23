import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../redux/todo.slice";
import {
  createTodoAsync,
  deleteTodosAsync,
  fetchTodosAsync,
  updateTodoAsync,
} from "../redux/todo.thunk";
import { RootState } from "../store";
import TodoInputSection from "./components/todoInputSection";
import TodoListView from "./components/todosListView";
import SortSelector from "./components/sortSelector";
import "./home.scss";

const HomePage: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);
  const [sortBy, setSortBy] = useState<string>("end-ascending");

  const { loading: todosLoading, data: todoList } = useSelector(
    (state: RootState) => state.todos.fetchTodos
  );

  const { loading: addTodoLoading, data: addTodoSuccess } = useSelector(
    (state: RootState) => state.todos.addTodo
  );

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, []);

  useEffect(() => {
    if (addTodoSuccess) {
      dispatch(todoActions.resetAddTodos);
    }
  }, [addTodoSuccess]);

  const handleAddTodo = (title: string, endDate: Date) => {
    dispatch(createTodoAsync({ title, endDate }));
  };

  const handleTodoDelete = (todoId: string) => {
    dispatch(deleteTodosAsync({ todoId }));
  };

  const handleTodoUpdate = (todo: Todo) => {
    const { title, status, endDate } = todo;
    const todoForUpdate = {
      title,
      status,
      endDate,
    };
    dispatch(updateTodoAsync({ todoId: todo._id, todo: todoForUpdate }));
  };

  useEffect(() => {
    if (!todoList) {
      return;
    }
    if (!sortBy) {
      return;
    }
    let sorted: Todo[] = [];
    switch (sortBy) {
      case "end-ascending":
        sorted = todoList
          .slice()
          .sort(
            (tA, tB) =>
              new Date(tA.endDate).getTime() - new Date(tB.endDate).getTime()
          );
        break;
      case "end-descending":
        sorted = todoList
          .slice()
          .sort(
            (tA, tB) =>
              new Date(tB.endDate).getTime() - new Date(tA.endDate).getTime()
          );
        break;
      case "created-ascending":
        sorted = todoList
          .slice()
          .sort(
            (tA, tB) =>
              new Date(tA.createdAt).getTime() -
              new Date(tB.createdAt).getTime()
          );
        break;
      case "created-descending":
        sorted = todoList
          .slice()
          .sort(
            (tA, tB) =>
              new Date(tB.createdAt).getTime() -
              +new Date(tA.createdAt).getTime()
          );
        break;
    }
    setSortedTodos(sorted);
  }, [sortBy, todoList]);

  return (
    <div className="todo-page">
      <h1 className="app-title">Todo App</h1>
      <TodoInputSection
        isLoading={addTodoLoading}
        resetInput={addTodoSuccess !== null}
        onAddTodo={handleAddTodo}
      />

      <div className="todo-sorter">
        <SortSelector
          onSortByChange={(val) => {
            setSortBy(val);
          }}
        />
      </div>

      <TodoListView
        todos={sortedTodos}
        loading={todosLoading}
        onTodoDelete={handleTodoDelete}
        onTodoStatusUpdate={handleTodoUpdate}
      />
    </div>
  );
};

export default HomePage;
