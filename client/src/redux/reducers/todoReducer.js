import { createSlice } from "@reduxjs/toolkit";
import * as todoAction from "../actions/todoAction";

const init = {
  loading: false,
  error: null,
  todoItems: [],
};

const todoReducer = createSlice({
  name: "todos",
  initialState: init,
  extraReducers: {
    [todoAction.getAllTodosAsync.pending]: (state) => {
      state.loading = true;
    },
    [todoAction.getAllTodosAsync.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [todoAction.getAllTodosAsync.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.todoItems = payload;
    },
    [todoAction.filterTodosAsync.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [todoAction.filterTodosAsync.rejected]: (state, { payload }) => {
      state.loading = false;
      state.todoItems = payload;
    },
    [todoAction.filterTodosAsync.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.todoItems = payload;
    },
  },
  reducers: {
    addTodo: todoAction.addTodo,
    updateTodo: todoAction.updateTodo,
    deleteTodo: todoAction.deleteTodo,
    removeAll: todoAction.removeAll,
  },
});

export const { addTodo, updateTodo, deleteTodo, removeAll } = todoReducer.actions;

export default todoReducer.reducer;
