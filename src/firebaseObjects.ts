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

const firebaseConfig = {
  apiKey: "AIzaSyC1lygts6cwiNu-PQ8XblkwvuTHtYaed_A",
  authDomain: "bursa-kurek-kulubu.firebaseapp.com",
  projectId: "bursa-kurek-kulubu",
  storageBucket: "bursa-kurek-kulubu.appspot.com",
  messagingSenderId: "689696235729",
  appId: "1:689696235729:web:51efc8d86b1376cd94e5f0",
  measurementId: "G-SL7QKXK9DX",
};

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
