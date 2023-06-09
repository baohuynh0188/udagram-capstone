import { apiEndpoint } from '../config';
import { Todo } from '../types/Todo';
import { CreateTodoRequest } from '../types/CreateTodoRequest';
import Axios from 'axios';
import { UpdateTodoRequest } from '../types/UpdateTodoRequest';

export const getTodoById = async (
  idToken: string,
  todoId: string
): Promise<Todo> => {
  console.log('Fetching todo');

  const response = await Axios.get(`${apiEndpoint}/todos/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  });
  console.log('Todo:', response.data);
  return response.data.item;
};

export const getTodos = async (idToken: string): Promise<Todo[]> => {
  console.log('Fetching todos');

  const response = await Axios.get(`${apiEndpoint}/todos`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  });
  console.log('Todos:', response.data);
  return response.data.items;
};

export const createTodo = async (
  idToken: string,
  newTodo: CreateTodoRequest
): Promise<Todo> => {
  const response = await Axios.post(
    `${apiEndpoint}/todos`,
    JSON.stringify(newTodo),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  );
  return response.data.item;
};

export const patchTodo = async (
  idToken: string,
  todoId: string,
  updatedTodo: UpdateTodoRequest
): Promise<void> => {
  await Axios.patch(
    `${apiEndpoint}/todos/${todoId}`,
    JSON.stringify(updatedTodo),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  );
};

export const deleteTodo = async (
  idToken: string,
  todoId: string
): Promise<void> => {
  await Axios.delete(`${apiEndpoint}/todos/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  });
};

export const getUploadUrl = async (
  idToken: string,
  todoId: string
): Promise<string> => {
  const response = await Axios.post(
    `${apiEndpoint}/todos/${todoId}/attachment`,
    '',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  );
  return response.data.uploadUrl;
};

export const uploadFile = async (
  uploadUrl: string,
  file: Buffer
): Promise<void> => {
  await Axios.put(uploadUrl, file);
};
