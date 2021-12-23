import TodoModel, { Todo } from "../models/todo.model";

export default class TodoService {
  async createTodo(title: string, endDate: Date) {
    const newTodo = new TodoModel({
      title,
      endDate,
    });

    await newTodo.save();

    return newTodo;
  }

  async findAllTodos() {
    const allTodos = await TodoModel.find();

    return allTodos;
  }

  async updateTodo(todoId: string, todo: Todo) {
    delete todo._id;
    await TodoModel.findByIdAndUpdate(todoId, { ...todo });
    const updatedTodo = await TodoModel.findById(todoId);

    return updatedTodo;
  }

  async deleteTodo(todoId: string) {
    const deleteResult = await TodoModel.findByIdAndRemove(todoId);
    return deleteResult;
  }
}
