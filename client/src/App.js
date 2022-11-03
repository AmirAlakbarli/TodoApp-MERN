import React, { useEffect, useRef } from "react";
import "./App.scss";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header/Header";
import AddTodo from "./components/AddTodo/AddTodo";
import EmptyList from "./components/EmptyList/EmptyList";
import TodoList from "./components/TodoList/TodoList";
import Footer from "./components/Footer/Footer";
import Filter from "./components/Filter/Filter";
import { getAllTodosAsync, filterTodosAsync } from "./redux/actions/todoAction";
import { filterTypes } from "./redux/actions/filterTodoAction";
function App() {
  const todos = useSelector((store) => store.todos);
  const resTodos = JSON.stringify(todos.todoItems)
  const cursorRef = useRef(null);
  const dispatch = useDispatch();

  const filterType = useSelector((store) => store.filter.filterType);

  useEffect(() => {
    if (filterType === filterTypes.ALL) dispatch(getAllTodosAsync());
    else if (filterType === filterTypes.ACTIVE)
      dispatch(filterTodosAsync({ isCompleted: false }));
    else if (filterType === filterTypes.COMPLETED)
      dispatch(filterTodosAsync({ isCompleted: true }));
  }, [dispatch, filterType, resTodos]);

  return (
    <div className="App">
      <div className="App-container">
        <Header />
        <Filter />
        <AddTodo cursorRef={cursorRef} />
        {todos?.todoItems?.length === 0 && todos.loading===false ? (
          <EmptyList />
        ) : (
          <TodoList cursorRef={cursorRef} />
        )}
        <Footer />
      </div>
    </div>
  );
}

export default App;
