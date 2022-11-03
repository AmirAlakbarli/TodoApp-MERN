import React, { useRef } from "react";
import "./todoElement.scss";
import Edit from "../../assets/images/png/edit.png";
import Delete from "../../assets/images/png/delete.png";
import Circle from "../../assets/images/png/circle.png";
import Check from "../../assets/images/png/check.png";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue } from "../../redux/reducers/inputValueReducer";
import { setIsEdit } from "../../redux/reducers/todoEditReducer";
import { updateTodo, deleteTodo } from "../../redux/reducers/todoReducer";
import todoAPI from "../../api/todoAPI";

const TodoElement = ({ todo, cursorRef }) => {
  const isEditTodo = useSelector((store) => store.isEdit);
  const refElement = useRef();
  const dispatch = useDispatch();

  const editTodoItem = () => {
    dispatch(setIsEdit(todo._id));
    dispatch(setInputValue(todo.text));
  };

  const clearEdit = () => {
    dispatch(setIsEdit(null));
    dispatch(setInputValue(""));
  };

  async function deleteTodoItem(id) {
    await new todoAPI().deleteTodo(id);
    dispatch(deleteTodo(id));
  }

  async function updateTodoItem(id, updateFields) {
    await new todoAPI().updateTodo(id, updateFields);
    dispatch(updateTodo({ _id:id, ...updateFields }));
  }

  return (
    <div
      ref={refElement}
      className={`todo-element${todo.isCompleted ? " ok" : ""}${
        todo._id === isEditTodo ? " edit" : ""
      }`}
    >
      <div className="change-buttons">
        <button
          className="btn-ok"
          onClick={async () => {
            await updateTodoItem(todo._id, { isCompleted: !todo.isCompleted });
          }}
          onMouseOver={() => {
            refElement.current.classList.add("isOk");
          }}
          onMouseOut={() => {
            refElement.current.classList.remove("isOk");
          }}
        >
          <img src={todo.isCompleted ? Check : Circle} alt="" />
        </button>
      </div>
      <p>{todo.text}</p>
      <div className="change-buttons">
        <button
          className="btn-edit"
          onClick={() => {
            if (todo._id !== isEditTodo) editTodoItem();
            else {
              clearEdit();
            }
            cursorRef.current.current.focus();
          }}
          onMouseOver={() => {
            refElement.current.classList.add("isEdit");
          }}
          onMouseOut={() => {
            refElement.current.classList.remove("isEdit");
          }}
        >
          <img src={Edit} alt="" />
        </button>
        <button
          className="btn-delete"
          onClick={async () => {
            await deleteTodoItem(todo._id);
            if (todo._id === isEditTodo) clearEdit();
          }}
          onMouseOver={() => {
            refElement.current.classList.add("isDelete");
          }}
          onMouseOut={() => {
            refElement.current.classList.remove("isDelete");
          }}
        >
          <img src={Delete} alt="" />
        </button>
      </div>
    </div>
  );
};

export default TodoElement;
