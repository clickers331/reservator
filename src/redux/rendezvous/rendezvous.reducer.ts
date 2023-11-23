import { createReducer } from "@reduxjs/toolkit";
import {
  addRendezvousAct,
  addUserDetailRendezvous,
  setDayRendezvous,
  setRendezvous,
  setUserDetailRendezvous,
} from "./rendezvous.actions";
import { Rendezvous } from "../../api";

export interface DayRendezvous {
  [key: string]: Rendezvous[];
}

export interface RendezvousState {
  rendezvousArr: Rendezvous[];
  userDetailRendezvousArr: Rendezvous[];
  dayRendezvous: DayRendezvous;
}

const initialState = {
  rendezvousArr: [],
  userDetailRendezvousArr: [],
  dayRendezvous: [],
};

const rendezvousReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setRendezvous, (state: any, action) => {
      state.rendezvousArr = action.payload;
    })
    .addCase(setDayRendezvous, (state: any, action) => {
      state.dayRendezvous = action.payload;
    })
    .addCase(addRendezvousAct, (state, action: any) => {
      state.rendezvousArr.push(action.payload as never);
    })
    .addCase(setUserDetailRendezvous, (state: any, action) => {
      state.userDetailRendezvousArr = action.payload;
    })
    .addCase(addUserDetailRendezvous, (state, action) => {
      state.userDetailRendezvousArr.push(action.payload as never);
    });
});

export default rendezvousReducer;
