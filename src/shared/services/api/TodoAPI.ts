import axios from 'axios';
import { parseISO } from 'date-fns';
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz';


const axiosInstance = axios.create();


export interface ITodo {
  id: string;
  label: string;
  complete: boolean;
  description: string;
  completeAt?: string;
}

export interface ITodoWithoutId {
  label: string;
  complete: boolean;
  description: string;
  completeAt?: string;
}

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const TodoAPI = {
  async getAll() {
    const response = await axiosInstance.get('/api/todos');

    const todos = response.data.todos as ITodo[];

    return todos.map(todo => ({
      ...todo,
      completeAt: todo.completeAt ? formatInTimeZone(todo.completeAt, timezone, "yyyy-MM-dd'T'HH:mm") : undefined
    }))
  },
  async getById(id: string) {
    const response = await axiosInstance.get(`/api/todos/${id}`);

    const todo = response.data.todos as ITodo;
    return {
      ...todo,
      completeAt: todo.completeAt ? formatInTimeZone(todo.completeAt, timezone, "yyyy-MM-dd'T'HH:mm") : undefined
    };
  },
  async create(data: ITodoWithoutId) {
    if (data.completeAt) {
      const parsedDatetime = parseISO(data.completeAt);
      const utcDatetime = fromZonedTime(parsedDatetime, timezone);
      data.completeAt = utcDatetime.toISOString();
    }

    const response = await axiosInstance.post('/api/todos', data);

    return response.data.todos as ITodo;
  },
  async updateById(id: string, data: Partial<ITodoWithoutId>) {
    if (data.completeAt) {
      const parsedDatetime = parseISO(data.completeAt);
      const utcDatetime = fromZonedTime(parsedDatetime, timezone);
      data.completeAt = utcDatetime.toISOString();
    }

    await axiosInstance.put(`/api/todos/${id}`, data);

    return;
  },
  async deleteById(id: string) {
    await axiosInstance.delete(`/api/todos/${id}`);

    return;
  },
};
