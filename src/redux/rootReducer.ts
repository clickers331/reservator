import userReducer from "./user/userReducer";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
