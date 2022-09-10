import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import throttle from "lodash/throttle";
import todoReducer from "./reducers/todoReducer";
import todoEditReducer from "./reducers/todoEditReducer";
import inputValueReducer from "./reducers/inputValueReducer";
import filterTodoReducer from "./reducers/filterTodoReducer";
import { loadState, saveState } from "./localStorage";

export const appStore = () => {
  const preloadedState = loadState("Todo App");
  const store = configureStore({
    reducer: {
      todos: todoReducer,
      isEdit: todoEditReducer,
      inputValue: inputValueReducer,
      filter: filterTodoReducer,
    },
    preloadedState,
  });

  store.subscribe(
    throttle(() => {
      saveState(
        {
          filter: store.getState().filter,
        },
        "Todo App"
      );
    }, 1000)
  );

  return store;
};
