import rendezvousReducer, {
  RendezvousState,
} from "./rendezvous/rendezvous.reducer";
import userReducer, { UserState } from "./user/user.reducer";
import { combineReducers } from "@reduxjs/toolkit";
import usersReducer, { UsersState } from "./users/users.reducer";

export interface ReduxState {
  user: UserState;
  users: UsersState;
  rendezvous: RendezvousState;
}

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  rendezvous: rendezvousReducer,
});

export default rootReducer;
