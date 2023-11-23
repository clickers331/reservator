import { createAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

const setRendezvous = createAction<Object>("rendezvous/set");
const setDayRendezvous = createAction<Object>("rendezvous/setDay");
const setUserDetailRendezvous = createAction<DocumentData>(
  "rendezvous/userDetail/set"
);
const addUserDetailRendezvous = createAction("rendezvous/userDetail/add");
const addRendezvousAct = createAction("rendezvous/add");

export {
  setRendezvous,
  addRendezvousAct,
  setUserDetailRendezvous,
  addUserDetailRendezvous,
  setDayRendezvous,
};
