import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterTypes } from "../../redux/actions/filterTodoAction";
import { filterTodo } from "../../redux/reducers/filterTodoReducer";
import { setInputValue } from "../../redux/reducers/inputValueReducer";
import { setIsEdit } from "../../redux/reducers/todoEditReducer";
import { removeAll } from "../../redux/reducers/todoReducer";
import todoAPI from "../../api/todoAPI";
import "./filter.scss";

const Filter = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const todos = store.todos;
  const todoItems = todos.todoItems;
  let count = todoItems.length;
  const activeCount = todoItems.filter((t) => !t.isCompleted).length;

  const clearAll = async () => {
    await new todoAPI().deleteAllTodos();
    dispatch(removeAll());
    dispatch(setInputValue(""));
    dispatch(setIsEdit(null));
  };

  const filterType = store.filter.filterType;
  switch (filterType) {
    case filterTypes.ACTIVE:
      count = activeCount;
      break;
    case filterTypes.COMPLETED:
      count = count - activeCount;
      break;
    default:
  }
  return (
    <div className="filter">
      <h3>{!todos.loading ? `${count} tasks` : ""}</h3>
      <div className="filter">
        <button
          className={`btn btn-all ${
            filterType === filterTypes.ALL ? "active" : ""
          }`}
          onClick={() => {
            dispatch(filterTodo(filterTypes.ALL));
          }}
        >
          All
        </button>
        <button
          className={`btn btn-active ${
            filterType === filterTypes.ACTIVE ? "active" : ""
          }`}
          onClick={() => {
            dispatch(filterTodo(filterTypes.ACTIVE));
          }}
        >
          Active
        </button>
        <button
          className={`btn btn-completed ${
            filterType === filterTypes.COMPLETED ? "active" : ""
          }`}
          onClick={() => {
            dispatch(filterTodo(filterTypes.COMPLETED));
          }}
        >
          Completed
        </button>
      </div>
      <button className="btn btn-removeAll" onClick={() => clearAll()}>
        Clear All
      </button>
    </div>
  );
};

export default Filter;
