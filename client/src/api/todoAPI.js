import axios from "axios";
import filterQuery from "../helper/filterQuery";
const baseURL = "https://amiralakbarli-todoapp.herokuapp.com/api";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

class todoAPI {
  async getAllTodos() {
    try {
      const allTodos = await instance.get("/todos");
      return allTodos;
    } catch (error) {
      throw new Error("Cannot get all todos");
    }
  }

  async getTodo(id) {
    try {
      const todo = await instance.get(`/todos/${id}`);
      return todo;
    } catch (error) {
      throw new Error("Cannot get todo by id");
    }
  }

  async addTodo(todo) {
    try {
      const newTodo = await instance.post("/todos", todo);
      return newTodo;
    } catch (error) {
      throw new Error("Cannot add new todo");
    }
  }

  async updateTodo(id, updateFields) {
    try {
      const updatedTodo = await instance.patch(`/todos/${id}`, updateFields);
      return updatedTodo;
    } catch (error) {
      throw new Error("Cannot update todo");
    }
  }

  async deleteTodo(id) {
    try {
      const deletedTodo = await instance.delete(`/todos/${id}`);
      return deletedTodo;
    } catch (error) {
      throw new Error("Cannot delete todo");
    }
  }

  async deleteAllTodos() {
    try {
      const allDeleted = await instance.delete("/todos");
      return allDeleted;
    } catch (error) {
      throw new Error("Cannot delete all todos");
    }
  }

  async filterTodos(filterFields) {
    try {
      const filteredTodos = await instance.get(
        `/todos?${filterQuery(filterFields)}`
      );
      return filteredTodos;
    } catch (error) {
      throw new Error("Cannot filter todos");
    }
  }
}

export default todoAPI;
