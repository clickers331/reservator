import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from "./redux/store";
import { resetUser, updateUserDetails } from "./redux/user/user.actions";

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
  if (user) {
    let userDetails: any; //Change it from any
    try {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      userDetails = docSnap.data();
    } catch (err: any) {
      console.log(err);
    }
    userDetails.birthDate = userDetails.birthDate.seconds;
    store.dispatch(
      updateUserDetails({
        uid: user.uid,
        email: user.email,
        ...userDetails,
      })
    );
  } else {
    store.dispatch(resetUser());
  }
});

export { app, db, auth };
