import { createAction } from "@reduxjs/toolkit";
import type { User } from "../../data/mockDatabase";

const setUsers = createAction("users/set");
const addToUsers = createAction<User[]>("users/add");
const resetUsers = createAction("users/reset");

export { setUsers, addToUsers, resetUsers };
