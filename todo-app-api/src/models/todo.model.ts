import { model, Schema } from "mongoose";
import { TODO_STATUS } from "../enums";

export interface Todo {
  _id?: string;
  title: string;
  endDate: Date;
  status: string;
  createdAt?: string;
}

const TodoSchema = new Schema<Todo>(
  {
    title: {
      type: String,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(TODO_STATUS),
      default: TODO_STATUS.PENDING,
      required: true,
    },
  },
  { timestamps: true }
);

const TodoModel = model<Todo>("Todo", TodoSchema);

export default TodoModel;
