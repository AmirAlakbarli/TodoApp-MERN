import { createSlice } from "@reduxjs/toolkit";

const init = null;

export const todoEditReducer = createSlice({
  name: "isEdit",
  initialState: init,
  reducers: {
    setIsEdit: (state, { payload }) => {
      return payload;
    },
  },
});

export const { setIsEdit } = todoEditReducer.actions;
export default todoEditReducer.reducer;
