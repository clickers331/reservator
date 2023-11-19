import { createAction } from "@reduxjs/toolkit";
import type { User } from "../../data/mockDatabase";

const updateSelf = createAction<any>("users/updateSelf");
const resetSelf = createAction("users/resetSelf");
const addToUsers = createAction<User[]>("users/add");
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
