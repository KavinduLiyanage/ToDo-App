import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

interface Props {
  isLoading: boolean;
  resetInput: boolean;
  onAddTodo: (title: string, endDate: Date) => void;
}
const TodoInputSection: React.FunctionComponent<Props> = ({
  isLoading,
  resetInput,
  onAddTodo,
}) => {
  const [todoTitle, setTodoTitle] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  useEffect(() => {
    if (resetInput) {
      console.log("resetting");
      setTodoTitle(null);
      setEndDate(new Date());
    }
  }, [resetInput]);

  const addClickHandler = () => {
    if (todoTitle && todoTitle.length > 0 && endDate) {
      onAddTodo(todoTitle, endDate);
    }
  };

  return (
    <div className="todo-input">
      <TextField
        id="todoInput"
        label="Add your new Todo"
        variant="outlined"
        style={{ width: 300, marginRight: 10 }}
        value={todoTitle || ""}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          autoOk
          inputVariant="outlined"
          variant="inline"
          format="MM/dd/yyyy"
          id="endDatePicker"
          label="End date"
          value={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
        />
      </MuiPickersUtilsProvider>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={addClickHandler}
        disabled={isLoading}
        style={{ height: "56px", marginLeft: 10 }}
      >
        {isLoading ? "Adding..." : "Add todo"}
      </Button>
    </div>
  );
};

export default TodoInputSection;
