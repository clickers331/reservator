import { createReducer } from "@reduxjs/toolkit";
import {
  addToUserLesson,
  addToUsers,
  resetUsers,
  setUsers,
  activateUserAct,
} from "./users.actions";
import { User } from "../../data/mockDatabase";

export interface UsersState {
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
      //Don't think I need it, can be replaced by "addToUsers"
      if (action.payload) console.log("yeyeye");
      //action.payload.forEach((user: User) => state.allUsers.push(user));
      else {
        console.error("Action payload doesn't exist on 'setUsers'");
      }
    })
    .addCase(addToUsers, (state, action) => {
      if (action.payload)
        state.allUsers = { ...state.allUsers, ...action.payload } as any;
      else {
        console.error("Action payload doesn't exist on 'addToUsers'");
      }
    })
    .addCase(resetUsers, (state, action) => {
      state.allUsers = {};
    })
    .addCase(addToUserLesson, (state, action) => {
      state.allUsers[action.payload.uid].lessonCount =
        state.allUsers[action.payload.uid].lessonCount + action.payload.amount;
    })
    .addCase(activateUserAct, (state, action) => {
      state.allUsers[action.payload].active =
        !state.allUsers[action.payload].active;
    });
});

export default usersReducer;
