import { createAction } from "@reduxjs/toolkit";
import type { User } from "../../data/mockDatabase";

const addToUsers = createAction<User[]>("users/add");
const addToUserLesson = createAction<Object>("users/addToLesson");
const activateUserAct = createAction("users/activate");
const resetUsers = createAction("users/reset");

export { addToUsers, resetUsers, addToUserLesson, activateUserAct };
