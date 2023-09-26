import { createAction, createReducer } from "@reduxjs/toolkit";


export const loginUser = createAction("LOGIN-USER");
export const logoutUser = createAction("LOGOUT-USER");


const initialState = {
  value: {
    userId: undefined,
    email: undefined,
    name: undefined,
    lastName: undefined,
    course: undefined,
    DNI: undefined,
    age:undefined,
    roleId: undefined,
    status: undefined
  },
};

const userReducer = createReducer(initialState, {
  [loginUser]: (state, action) => {
    state.value = action.payload;
  },
  [logoutUser]: (state, action) => {
    state.value = initialState
  },
});

export default userReducer;