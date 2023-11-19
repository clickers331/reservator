import { createReducer } from "@reduxjs/toolkit";
import {
  increaseLessonCount,
  decreaseLessonCount,
  addToUsers,
  resetUsers,
  activateUserAct,
  updateSelf,
  resetSelf,
} from "./users.actions";
import { User } from "../../data/mockDatabase";

export interface UsersState {
  allUsers: {
    [key: string]: User;
  };
  self: any;
}

const initialState = {
  self: {},
  allUsers: {},
} as UsersState;

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateSelf, (state, action) => {
      state.self = action.payload;
    })
    .addCase(resetSelf, (state, action) => {
      state.self = {};
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
    .addCase(increaseLessonCount, (state: any, action: any) => {
      if (state.self.uid === action.payload.uid) {
        state.self.lessonCount = state.self.lessonCount + action.payload.amount;
      } else if (state.allUsers[action.payload.uid]) {
        state.allUsers[action.payload.uid].lessonCount =
          state.allUsers[action.payload.uid].lessonCount +
          action.payload.amount;
      } else {
        throw new Error("User not found");
      }
    })
    .addCase(decreaseLessonCount, (state: any, action: any) => {
      if (state.self.uid === action.payload.uid) {
        state.self.lessonCount = state.self.lessonCount - action.payload.amount;
      } else if (state.allUsers[action.payload.uid]) {
        state.allUsers[action.payload.uid].lessonCount =
          state.allUsers[action.payload.uid].lessonCount -
          action.payload.amount;
      } else {
        throw new Error("User not found");
      }
    })
    .addCase(activateUserAct, (state: any, action: any) => {
      state.allUsers[action.payload].active =
        !state.allUsers[action.payload].active;
    });
});

export default usersReducer;
