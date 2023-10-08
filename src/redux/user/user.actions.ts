import { createAction } from "@reduxjs/toolkit";
import type { UserState } from "./user.reducer";

const increaseLessonCount = createAction<number>("user/increaseLessonCount");
const decreaseLessonCount = createAction<number>("user/decreaseLessonCount");
const updateUserDetails = createAction<UserState>("user/updateUserDetails");
const resetUser = createAction("user/resetUser");

export {
  updateUserDetails,
  resetUser,
  decreaseLessonCount,
  increaseLessonCount,
};
