import rendezvousReducer, {
  RendezvousState,
} from "./rendezvous/rendezvous.reducer";
import { combineReducers } from "@reduxjs/toolkit";
import usersReducer, { UsersState } from "./users/users.reducer";

export interface ReduxState {
  users: UsersState;
  rendezvous: RendezvousState;
}

const rootReducer = combineReducers({
  users: usersReducer,
  rendezvous: rendezvousReducer,
});

export default rootReducer;
