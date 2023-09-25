import { createReducer } from "@reduxjs/toolkit";
import { addToUsers, resetUsers, setUsers } from "./users.actions";
import { User } from "../../data/mockDatabase";

interface UsersState {
  allUsers: {
    [key: string]: User[];
  };
}

const initialState = {
  allUsers: {},
} as UsersState;

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUsers, (state, action) => {
      if (action.payload) console.log("yeyeye");
      //action.payload.forEach((user: User) => state.allUsers.push(user));
      else {
        console.error("Action payload doesn't exist on 'setUsers'");
      }
    })
    .addCase(addToUsers, (state, action) => {
      if (action.payload)
        state.allUsers = { ...state.allUsers, ...action.payload };
      else {
        console.error("Action payload doesn't exist on 'setUsers'");
      }
    })
    .addCase(resetUsers, (state, action) => {
      state.allUsers = {};
    });
});

export default usersReducer;
