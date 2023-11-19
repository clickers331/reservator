import { createReducer } from "@reduxjs/toolkit";
import {
  addRendezvousAct,
  addUserDetailRendezvous,
  cancelRendezvousAct,
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
    })
    .addCase(cancelRendezvousAct, (state: any, action) => {
      let found = false;
      const rendIndexUserDetails = state.userDetailRendezvousArr.findIndex(
        (rend: any) => rend.id === action.payload
      );
      const rendIndexGeneral = state.rendezvousArr.findIndex(
        (rend: any) => rend.id === action.payload
      );
      let rendIndexDay = -1;
      Object.entries(state.dayRendezvous).forEach(([key, value]: any) => {
        rendIndexDay = value.findIndex(
          (rend: any) => rend.id === action.payload
        );
        if (rendIndexDay >= 0) {
          state.dayRendezvous[key][rendIndexDay] = {
            ...state.dayRendezvous[key][rendIndexDay],
            cancelled: true,
          };
          found = true;
        }
      });

      if (rendIndexUserDetails >= 0) {
        state.userDetailRendezvousArr[rendIndexUserDetails] = {
          ...state.userDetailRendezvousArr[rendIndexUserDetails],
          cancelled: true,
        };
        found = true;
      }
      if (rendIndexGeneral >= 0) {
        state.rendezvousArr[rendIndexGeneral] = {
          ...state.rendezvousArr[rendIndexGeneral],
          cancelled: true,
        };
        found = true;
      }
      if (!found) {
        console.log(found);
        console.error("Rendezvous not found (cancelRendezvousAct)");
      }
    });
});

export default rendezvousReducer;
