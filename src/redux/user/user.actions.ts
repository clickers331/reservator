import { createAction } from "@reduxjs/toolkit";
import type { UserState } from "./user.reducer";

const updateUserDetails = createAction<UserState>("user/updateUserDetails");
const resetUser = createAction("user/resetUser");

export { updateUserDetails, resetUser };
