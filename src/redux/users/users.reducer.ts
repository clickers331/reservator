import { createReducer } from "@reduxjs/toolkit";
import {
  addToUserLesson,
  addToUsers,
  resetUsers,
  activateUserAct,
} from "./users.actions";
import { User } from "../../data/mockDatabase";

export interface UsersState {
  allUsers: {
    [key: string]: User;
  };
}

const initialState = {
  allUsers: {},
} as UsersState;

const usersReducer = createReducer(initialState, (builder) => {
  builder
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
    .addCase(addToUserLesson, (state: any, action: any) => {
      state.allUsers[action.payload.uid].lessonCount =
        state.allUsers[action.payload.uid].lessonCount + action.payload.amount;
    })
    .addCase(activateUserAct, (state: any, action: any) => {
      state.allUsers[action.payload].active =
        !state.allUsers[action.payload].active;
    });
});

export default usersReducer;
