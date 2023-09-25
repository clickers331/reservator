import { createReducer } from "@reduxjs/toolkit";
import { setRendezvous } from "./rendezvous.actions";

const initialState = {
  rendezvousArr: [],
};

const rendezvousReducer = createReducer(initialState, (builder) => {
  builder.addCase(setRendezvous, (state, action) => {
    action.forEach((rendezvous) => {
      state.rendezvousArr.push(rendezvous);
    });
  });
});

export default rendezvousReducer;
