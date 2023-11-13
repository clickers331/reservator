import { createAction } from "@reduxjs/toolkit";
import type { User } from "../../data/mockDatabase";

const addToUsers = createAction<User[]>("users/add");
const increaseLessonCount = createAction<Object>("users/increaseLessonCount");
const decreaseLessonCount = createAction<Object>("users/decreaseLessonCount");
const activateUserAct = createAction("users/activate");
const resetUsers = createAction("users/reset");

export {
  addToUsers,
  resetUsers,
  increaseLessonCount,
  decreaseLessonCount,
  activateUserAct,
};
