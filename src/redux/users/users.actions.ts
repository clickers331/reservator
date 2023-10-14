import { createAction } from "@reduxjs/toolkit";
import type { User } from "../../data/mockDatabase";

const setUsers = createAction("users/set");
const addToUsers = createAction<User[]>("users/add");
const addToUserLesson = createAction<Object>("users/addToLesson");
const activateUserAct = createAction("users/activate");
const resetUsers = createAction("users/reset");

export { setUsers, addToUsers, resetUsers, addToUserLesson, activateUserAct };
