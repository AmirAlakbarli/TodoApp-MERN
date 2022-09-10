import { createAsyncThunk } from "@reduxjs/toolkit";
import todoAPI from "../../api/todoAPI";

export const getAllTodosAsync = createAsyncThunk(
  "todos/fetchTodos",
  async () => {
    try {
      const allTodos = await (await new todoAPI().getAllTodos()).data.reverse();
      return allTodos;
    } catch (error) {
      throw error;
    }
  }
);

export const filterTodosAsync = createAsyncThunk(
  "todos/filterTodos",
  async (filterFields) => {
    try {
      const filteredTodos = await (
        await new todoAPI().filterTodos(filterFields)
      ).data.reverse();
      return filteredTodos;
    } catch (error) {
      throw error;
    }
  }
);

export const addTodo = (state, { payload }) => {
  state.loading = true;
  try {
    state.todoItems.unshift(payload);
  } catch (error) {
    state.error = error;
  }
  state.loading = false;
};

export const updateTodo = (state, { payload }) => {
  state.loading = true;
  try {
    const updatedTodos = [...state.todoItems].map((t) => {
      if (t._id === payload._id) {
        // console.log({ ...t, ...payload })
        return { ...t, ...payload };
      }
      return t;
    });
    state.todoItems = [...updatedTodos];
  } catch (error) {
    state.error = error;
  }
  state.loading = false;
};

export const deleteTodo = (state, { payload }) => {
  state.loading = true;
  try {
    const deletedTodos = [...state.todoItems].filter((t) => t._id !== payload);
    state.todoItems = [...deletedTodos];
  } catch (error) {
    state.error = error;
  }
  state.loading = false;
};

export const removeAll = (state) => {
  state.loading = true;
  try {
    state.todoItems = [];
  } catch (error) {
    state.error = error;
  }
  state.loading = false;
};
