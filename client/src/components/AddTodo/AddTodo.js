import React, { useRef } from "react";
import "./addTodo.scss";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue } from "../../redux/reducers/inputValueReducer";
import { setIsEdit } from "../../redux/reducers/todoEditReducer";
import { addTodo, updateTodo } from "../../redux/reducers/todoReducer";
import todoAPI from "../../api/todoAPI";
import Add from "../../assets/images/png/add.png";

const AddTodo = ({ cursorRef }) => {
  const inputRef = useRef();
  cursorRef.current = inputRef;
  const dispatch = useDispatch();
  const { isEdit, inputValue } = useSelector((store) => store);

  const inputValueHandler = (e) => {
    try {
      dispatch(setInputValue(e.target.value));
    } catch (error) {
      throw new Error("new todo cannot be added");
    }
  };

  async function addTodoHandler(newTodo) {
    const todo = await new todoAPI().addTodo(newTodo);
    dispatch(addTodo(await todo.data));
  }

  async function updateTodoHandler(id, updateFields) {
    await new todoAPI().updateTodo(id, updateFields);
    dispatch(updateTodo({ _id:id, ...updateFields }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (inputValue.trim().length > 0) {
      if (!isEdit) {
        await addTodoHandler({ text: inputValue.trim(), isCompleted: false });
        dispatch(setInputValue(""));
      } else {
        await updateTodoHandler(isEdit, { text: inputValue.trim() });
        dispatch(setInputValue(""));
        dispatch(setIsEdit(null));
      }
    } else {
      alert("Please fill input");
    }
  };

  return (
    <div className="add-todo">
      <form onSubmit={submitHandler}>
        <input
          onChange={(e) => {
            inputValueHandler(e);
          }}
          ref={inputRef}
          value={inputValue}
          id="add-input"
          type="text"
          placeholder="Add a new task"
        />
        <button className="add-btn">
          <img src={Add} alt="" />
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
