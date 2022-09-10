import React from "react";
import { useSelector } from "react-redux";
import TodoElement from "../TodoElement/TodoElement";
import "./todoList.scss";

const TodoList = ({ cursorRef }) => {
  const todos = useSelector((store) => store.todos);
  const todoItems = todos.todoItems;

  return (
    <div className="todo-list">
      {todoItems.map((todoItem) => (
        <TodoElement key={todoItem._id} todo={todoItem} cursorRef={cursorRef} />
      ))}
    </div>
  );
};

export default TodoList;
