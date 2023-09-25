import { createAction, createReducer } from "@reduxjs/toolkit";

export const loginUser = createAction("LOGIN-USER");

const initialState = {
  value: {
    id: undefined,
    email: undefined,
    name: undefined,
    lastName: undefined,
  },
};

const userReducer = createReducer(initialState, {
  [loginUser]: (state, action) => {
    state.value = action.payload;
  },
});

export default userReducer;