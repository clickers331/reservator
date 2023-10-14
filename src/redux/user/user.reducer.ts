import { createReducer } from "@reduxjs/toolkit";
import {
  resetUser,
  updateUserDetails,
  decreaseLessonCount,
  increaseLessonCount,
} from "./user.actions";

export interface UserState {
  email: string;
  isAdmin?: boolean;
  uid: string;
  birthDate: string;
  birthPlace: string;
  bloodType: string;
  fullName: string;
  phone: string;
  lessonCount: string | number;
}

const initialState = {
  email: "",
  isAdmin: false,
  uid: "",
  birthDate: "",
  birthPlace: "",
  bloodType: "",
  fullName: "",
  phone: "",
} as UserState;

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateUserDetails, (state: any, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        state[key] = value;
      });
    })
    .addCase(resetUser, (state: any, action) => {
      for (const key in state) {
        delete state[key];
      }
    })
    .addCase(decreaseLessonCount, (state: any, action) => {
      state.lessonCount = parseInt(state.lessonCount) - (action.payload || 1);
    })
    .addCase(increaseLessonCount, (state: any, action) => {
      state.lessonCount = parseInt(state.lessonCount) + (action.payload || 1);
    });
});

export default userReducer;
