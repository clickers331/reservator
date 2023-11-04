import { createReducer } from "@reduxjs/toolkit";
import {
  addRendezvousAct,
  addUserDetailRendezvous,
  cancelRendezvousAct,
  setRendezvous,
  setUserDetailRendezvous,
} from "./rendezvous.actions";

export interface RendezvousState {
  rendezvousArr: any[];
  userDetailRendezvousArr: any[];
}

const initialState = {
  rendezvousArr: [],
  userDetailRendezvousArr: [],
};

const rendezvousReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setRendezvous, (state: any, action) => {
      state.rendezvousArr = action.payload;
    })
    .addCase(addRendezvousAct, (state, action: any) => {
      state.rendezvousArr.push(action.payload as never);
    })
    .addCase(setUserDetailRendezvous, (state: any, action) => {
      state.userDetailRendezvousArr = action.payload;
    })
    .addCase(addUserDetailRendezvous, (state, action) => {
      state.userDetailRendezvousArr.push(action.payload as never);
    })
    .addCase(cancelRendezvousAct, (state: any, action) => {
      const rendIndexUserDetails = state.userDetailRendezvousArr.findIndex(
        (rend: any) => rend.id === action.payload
      );
      const rendIndexGeneral = state.rendezvousArr.findIndex(
        (rend: any) => rend.id === action.payload
      );
      if (rendIndexUserDetails >= 0) {
        state.userDetailRendezvousArr[rendIndexUserDetails] = {
          ...state.userDetailRendezvousArr[rendIndexUserDetails],
          cancelled: true,
        };
      }
      if (rendIndexGeneral >= 0) {
        state.rendezvousArr[rendIndexGeneral] = {
          ...state.rendezvousArr[rendIndexGeneral],
          cancelled: true,
        };
      }
    });
});

export default rendezvousReducer;
