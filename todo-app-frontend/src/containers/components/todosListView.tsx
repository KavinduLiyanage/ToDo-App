import React from "react";
import TodoCard from "./todoCard";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  todos: Todo[];
  loading: boolean;
  onTodoDelete: (todoId: string) => void;
  onTodoStatusUpdate: (todo: Todo) => void;
}
const TodoListView: React.FunctionComponent<Props> = ({
  todos,
  loading,
  onTodoDelete,
  onTodoStatusUpdate,
}) => {
  const events = { onTodoDelete, onTodoStatusUpdate };

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoCard key={todo._id} todo={todo} {...events} />
      ))}
    </div>
  );
};

export default TodoListView;
