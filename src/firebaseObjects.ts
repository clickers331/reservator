import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

export { app, db, auth };
