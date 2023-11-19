import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from "./redux/store";
import { resetSelf, updateSelf } from "./redux/users/users.actions";
import { getPaginatedUsers, getRendezvousDay } from "./api";

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

onAuthStateChanged(auth, async (user) => {
  let unsubs = [];
  if (user) {
    let userDetails: any; //Change it from any
    try {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      userDetails = docSnap.data();
      if (userDetails.admin) {
        unsubs = [await getPaginatedUsers(), await getRendezvousDay()];
      }
    } catch (err: any) {
      console.log(err);
    }
    userDetails.birthDate = userDetails.birthDate.seconds;
    store.dispatch(
      updateSelf({
        uid: user.uid,
        email: user.email,
        ...userDetails,
      })
    );
  } else {
    unsubs.forEach((unsub) => unsub());
    console.log("unsubbed from all");
    store.dispatch(resetSelf());
  }
});

export { app, db, auth };
