export const filterTypes = {
  ALL: "ALL",
  COMPLETED: "COMPLETED",
  ACTIVE: "ACTIVE",
};

export const filterTodo = (state, { payload }) => {
  state.loading = true;
  try {
    state.filterType = payload;
  } catch (error) {
    state.error = error;
  }
  state.loading = false;
};
