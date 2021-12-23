import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

interface Props {
  todo: Todo;
  onTodoDelete: (todoId: string) => void;
  onTodoStatusUpdate: (todo: Todo) => void;
}
const TodoCard: React.FunctionComponent<Props> = ({
  todo,
  onTodoDelete,
  onTodoStatusUpdate,
}) => {
  const handleDeleteClick = () => {
    onTodoDelete(todo._id);
  };

  const handleStatusChange = (checked: boolean) => {
    const updatedTodo = {
      ...todo,
      status: checked ? "COMPLETED" : "PENDING",
    };
    onTodoStatusUpdate(updatedTodo);
  };

  return (
    <Card className="todo" style={{ backgroundColor: "#f3f3f3" }}>
      <CardContent>
        <div className="todo-details">
          <FormControlLabel
            control={
              <Checkbox
                checked={todo.status === "COMPLETED"}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleStatusChange(event.target.checked)
                }
                name={todo.title}
                color="primary"
              />
            }
            label={
              <p
                className={todo.status === "COMPLETED" ? "todo strike" : "todo"}
              >
                {todo.title}
              </p>
            }
          />
          <div>
            <span
              className={todo.status === "COMPLETED" ? "todo strike" : "todo"}
            >
              End Date: {new Date(todo.endDate).toDateString()}
            </span>
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon style={{ color: "red" }} />
            </IconButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
