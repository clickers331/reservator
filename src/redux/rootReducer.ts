import rendezvousReducer from "./rendezvous/rendezvous.reducer";
import userReducer from "./user/user.reducer";
import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./users/users.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  rendezvous: rendezvousReducer,
});

export default rootReducer;
