interface Todo {
  _id: string;
  title: string;
  status: string;
  endDate: Date;
  createdAt: Date;
}

type StateErrorType = null | string;

interface CreateTodoPayload {
  title: string;
  endDate: Date;
}

interface UpdateTodoPayload {
  todoId: string;
  todo: {
    title: string;
    endDate: Date;
    status: string;
  };
}

interface DeleteTodoPayload {
  todoId: string;
}

type APIResponseData = {
  message: string;
  body: unknown;
};
