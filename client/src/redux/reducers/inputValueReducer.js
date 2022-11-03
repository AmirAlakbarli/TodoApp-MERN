import { createSlice } from "@reduxjs/toolkit";

const init = "";
export const inputValueReducer = createSlice({
  name: "inputValue",
  initialState: init,
  reducers: {
    setInputValue: (state, { payload }) => {
      return payload;
    },
  },
});

export const { setInputValue } = inputValueReducer.actions;
export default inputValueReducer.reducer;
