import { createReducer } from "@reduxjs/toolkit";
import { resetUser, updateUserDetails } from "./user.actions";

export interface UserState {
  email: string;
  isAdmin?: boolean;
  uid: string;
  birthDate: string;
  birthPlace: string;
  bloodType: string;
  fullName: string;
  phone: string;
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
    .addCase(updateUserDetails, (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        state[key] = value;
      });
    })
    .addCase(resetUser, (state, action) => {
      state = initialState;
    });
});

export default userReducer;
