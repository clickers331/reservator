import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, onSnapshot } from "firebase/firestore";
import { Unsubscribe, getAuth, onAuthStateChanged } from "firebase/auth";
import store from "./redux/store";
import { resetSelf, updateSelf } from "./redux/users/users.actions";
import {
  getAllRendezvous,
  getAllRendezvousUser,
  getPaginatedUsers,
  getRendezvousDay,
} from "./api";

console.log(JSON.parse(import.meta.env.VITE_REACT_APP_FIREBASE_CONFIG));

const firebaseConfig = JSON.parse(
  import.meta.env.VITE_REACT_APP_FIREBASE_CONFIG
);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let unsubs = [] as Unsubscribe[];
onAuthStateChanged(auth, async (user) => {
  if (user) {
    let userDetails: any; //Change it from any
    try {
      const unsubscribe = await onSnapshot(
        doc(db, "users", user.uid),
        async (docSnap) => {
          console.log("User updated");
          userDetails = docSnap.data();
          userDetails.birthDate = userDetails.birthDate.seconds;
          store.dispatch(
            updateSelf({
              uid: user.uid,
              email: user.email,
              ...userDetails,
            })
          );

          unsubs = [...unsubs, unsubscribe];
          if (userDetails.admin) {
            unsubs = [
              ...unsubs,
              await getPaginatedUsers(),
              await getRendezvousDay(),
              await getAllRendezvous(),
            ];
          }
        }
      );
    } catch (err: any) {
      console.log(err);
    }
  } else {
    unsubs.forEach((unsub) => unsub());
    unsubs = [];
    store.dispatch(resetSelf());
  }
});

export { app, db, auth };
