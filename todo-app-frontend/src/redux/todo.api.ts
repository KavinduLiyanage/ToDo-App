import axios from "axios";
import {
  BASE_URL,
  TODO_DELETE,
  TODO_FETCH_ALL,
  TODO_POST,
  TODO_PUT,
} from "../api/endPoints";

const fetchAllTodos = async () => {
  const response = await axios.get(`${BASE_URL}${TODO_FETCH_ALL}`);
  if (response.status === 200) {
    return (response.data as APIResponseData).body;
  }
  throw new Error((response.data as APIResponseData).message);
};

const postTodo = async (payload: object) => {
  try {
    const response = await axios.post(`${BASE_URL}${TODO_POST}`, payload);
    if (response.status === 201) {
      return (response.data as APIResponseData).body;
    }
    throw new Error((response.data as APIResponseData).message);
  } catch (error) {
    console.error("Failed to post todo", error);
    return null;
  }
};

const putTodo = async (payload: UpdateTodoPayload) => {
  const response = await axios.put(
    `${BASE_URL}${TODO_PUT}/${payload.todoId}`,
    payload.todo as object
  );
  if (response.status === 201) {
    return (response.data as APIResponseData).body;
  }
  throw new Error((response.data as APIResponseData).message);
};

const deleteTodo = async (payload: DeleteTodoPayload) => {
  const response = await axios.delete(
    `${BASE_URL}${TODO_DELETE}/${payload.todoId}`
  );
  if (response.status === 200) {
    return (response.data as APIResponseData).body;
  }
  throw new Error((response.data as APIResponseData).message);
};

const todoAPI = {
  fetchAllTodos,
  postTodo,
  putTodo,
  deleteTodo,
};

export default todoAPI;
