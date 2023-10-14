import { createAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

const setRendezvous = createAction<Object>("rendezvous/set");
const setUserDetailRendezvous = createAction<DocumentData>(
  "rendezvous/userDetail/set"
);
const addUserDetailRendezvous = createAction("rendezvous/userDetail/add");
const addRendezvousAct = createAction("rendezvous/add");
const cancelRendezvousAct = createAction("rendezvous/cancel");

export {
  setRendezvous,
  addRendezvousAct,
  setUserDetailRendezvous,
  addUserDetailRendezvous,
  cancelRendezvousAct,
};
