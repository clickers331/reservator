import { createAction } from "@reduxjs/toolkit";
import { User } from "../../api";

export interface AddToUsersPayload {
  [uid: string]: User;
}

const updateSelf = createAction<any>("users/updateSelf");
const resetSelf = createAction("users/resetSelf");
const addToUsers = createAction<AddToUsersPayload>("users/add");
const increaseLessonCount = createAction<Object>("users/increaseLessonCount");
const decreaseLessonCount = createAction<Object>("users/decreaseLessonCount");
const activateUserAct = createAction("users/activate");
const resetUsers = createAction("users/reset");

export {
  resetSelf,
  updateSelf,
  addToUsers,
  resetUsers,
  increaseLessonCount,
  decreaseLessonCount,
  activateUserAct,
};
