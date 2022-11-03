import { createSlice } from "@reduxjs/toolkit";
import * as filterAction from "../actions/filterTodoAction";

const init = {
  loading: false,
  error: null,
  filterType: "ALL",
};

export const filterTodoReducer = createSlice({
  name: "filter",
  initialState: init,
  reducers: {
    filterTodo: filterAction.filterTodo,
  },
});

export const { filterTodo } = filterTodoReducer.actions;
export default filterTodoReducer.reducer;
