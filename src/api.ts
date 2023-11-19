import {
  onAuthStateChanged,
  type User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  setDoc,
  doc,
  Timestamp,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  updateDoc,
  arrayUnion,
  addDoc,
  where,
  startAt,
} from "firebase/firestore";
import { db, auth } from "./firebaseObjects.js";
import store from "./redux/store.js";
import {
  activateUserAct,
  increaseLessonCount,
  decreaseLessonCount,
  addToUsers,
  resetUsers,
} from "./redux/users/users.actions.js";
import {
  cancelRendezvousAct,
  addUserDetailRendezvous,
  setRendezvous,
  setUserDetailRendezvous,
  setDayRendezvous,
} from "./redux/rendezvous/rendezvous.actions.js";
import { Store } from "react-notifications-component";

const SYSTEM_CLOSE_TIME = 23;

export interface ErrorObject {
  error: string | number;
}

export interface FormattedDay {
  [key: `${number}` | number]: Rendezvous[];
}

export type Rendezvous2D = Rendezvous[][];

async function getPaginatedUsers(lastRef?: any, lim = 10): Promise<any> {
  const q = query(
    collection(db, "users"),
    orderBy("fullName"),
    startAfter(lastRef || 0),
    limit(lim)
  );
  const userData = await getDocs(q);
  console.log("Get Users (getPaginatedUsers)");
  const usersObj: any = {};
  userData.forEach((user) => {
    const userObj = {
      uid: user.id,
      ...user.data(),
    } as any;
    userObj.birthDate = userObj.birthDate.seconds;
    usersObj[user.id] = userObj;
  });
  store.dispatch(addToUsers(usersObj));
  return userData;
}

async function getAllRendezvous() {
  try {
    const q = query(
      collection(db, "rendezvous"),
      orderBy("date"),
      startAt(Date.now())
    );
    const rendezvous = await getDocs(q);
    console.log("Rendezvous Request (getAllRendezvous)");
    const serializableRendezvous = rendezvous.docs.map((rend) => {
      const data = rend.data();
      data.id = rend.id;
      data.date = data.date.seconds;
      return data;
    });
    store.dispatch(setRendezvous(serializableRendezvous));

    return rendezvous.docs;
  } catch (err) {
    console.error(err);
  }
}

async function activateUser(uid: any) {
  //Rename to "toggleUserActive"
  const user = store.getState().users.allUsers[uid] as any;
  try {
    await updateDoc(doc(db, "users", uid), {
      active: !user.active,
    });
    console.log("Activate User (activateUser)");
    store.dispatch(activateUserAct(uid));
  } catch (err) {
    console.error(err);
  }
}

async function getRendezvousDay(date: string) {
  const newDate = new Date(date) || new Date();
  const today = new Date(newDate);
  today.setHours(0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  try {
    const q = query(
      collection(db, "rendezvous"),
      where("date", ">=", Timestamp.fromDate(today)),
      where("date", "<", Timestamp.fromDate(tomorrow))
    );

    const docs = await getDocs(q);
    console.log("getRendezvousForTheDay");
    const rendezvous = {};
    docs.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      data.date = data.date.seconds * 1000;
      const date = new Date(data.date);
      if (rendezvous[date.getHours()]) {
        rendezvous[date.getHours()].push(data);
      } else {
        rendezvous[date.getHours()] = [data];
      }
    });
    store.dispatch(setDayRendezvous(rendezvous));
    return rendezvous;
  } catch (err) {
    console.error(err);
  }
}

async function cancelDay(date: string) {
  const newDate = new Date(Date.now());
  const today = new Date(
    newDate.getFullYear(),
    newDate.getMonth(),
    newDate.getDate()
  );
  const tomorrow = new Date(
    newDate.getFullYear(),
    newDate.getMonth(),
    newDate.getDate() + 1
  );
  try {
    const q = query(
      collection(db, "rendezvous"),
      where("date", ">=", Timestamp.fromDate(today)),
      where("date", "<", Timestamp.fromDate(tomorrow))
    );
    console.log("cancelDayFB");
    const docs = await getDocs(q);
    docs.forEach(async (rendDoc) => {
      const docData = rendDoc.data();
      if (!docData.cancelled) {
        cancelRendezvous(rendDoc.id);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

async function cancelRendezvous(rendId: any) {
  const user = store.getState().users.self as UserState;
  const currentTimeData = await getCurrentTime();
  const dateNow = new Date(currentTimeData.datetime);
  try {
    if (dateNow.getHours() < SYSTEM_CLOSE_TIME) {
      await updateDoc(doc(db, "rendezvous", rendId), {
        cancelled: true,
      });
      console.log("cancelOneRendezvous");
      await addClass(user.uid, 1);
      store.dispatch(cancelRendezvousAct(rendId));
    } else {
      throw Error("Saat 19:00'dan sonra sistem kapanır.");
    }
  } catch (err: any) {
    Store.addNotification({
      title: "Hata",
      message: err.message,
      type: "danger",
      container: "bottom-right",
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  }
}
async function getAllRendezvousUser(uid?: string) {
  try {
    const userID = uid || auth.currentUser?.uid;
    const q = query(
      collection(db, "rendezvous"),
      where("date", ">=", Timestamp.fromDate(new Date(Date.now()))),
      where("uid", "==", userID),
      orderBy("date")
    );
    const userRendezvous = await getDocs(q);
    console.log("getAllRendezvousUser");
    const serializableRendezvous = userRendezvous.docs.map((rend) => {
      const data = rend.data();
      data.date = data.date.seconds;
      data.id = rend.id;
      return data;
    });
    store.dispatch(setUserDetailRendezvous(serializableRendezvous));
    return userRendezvous.docs;
  } catch (error) {
    console.error(error);
  }
}

async function searchUserByName(name: string) {
  const q = query(
    collection(db, "users"),
    where("fullName", ">=", name),
    where("fullName", "<=", name + "\uf8ff")
  );
  const userData = await getDocs(q);
  const usersObj: any = {};
  userData.forEach((user) => {
    const userObj = {
      uid: user.id,
      ...user.data(),
    } as any;
    userObj.birthDate = userObj.birthDate.seconds;
    usersObj[user.id] = userObj;
  });
  store.dispatch(resetUsers());
  store.dispatch(addToUsers(usersObj));
  console.log("Search User (searchUserByName)");
}

async function getUser() {
  let returnedUser: FirebaseUser | null = null;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      returnedUser = user;
    } else {
      returnedUser = null;
    }
  });
  return returnedUser;
}

async function getUserWithUID(uid: string) {
  const user = await getDoc(doc(db, "users", uid));
  console.log("getUser");
  return user.data();
}

export interface AuthFormValues {
  email: string;
  fullName?: string;
  phone?: string;
  bloodType?: string;
  birthPlace?: string;
  birthDate?: string;
  password: string;
}

async function createNewAccount(values: AuthFormValues) {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    if (user) {
      const yeah = await setDoc(doc(db, `users/${user.user.uid}`), {
        email: values.email,
        fullName: values.fullName,
        phone: values.phone,
        birthDate: Timestamp.fromDate(new Date(values.birthDate as string)),
        bloodType: values.bloodType,
        active: false,
        lessonCount: 0,
      });
      console.log("User Request (createNewAccount)");
    }
  } catch (err: any) {
    console.error(err.message);
    return err;
  }
}

async function signIn(values: AuthFormValues) {
  try {
    await signInWithEmailAndPassword(auth, values.email, values.password);
    console.log("Sign In (createNewAccount)");
  } catch (err: any) {
    console.error(err.message);
  }
}

async function getUserFromStore(uid: string) {
  const user =
    store.getState().users.allUsers[uid] || store.getState().users.self;
  if (!user) throw new Error("User doesn't exist");
  return user;
}

async function decreaseLessonAmount(uid: string, amount = 1) {
  store.dispatch(decreaseLessonCount({ uid, amount }));
  const user = await getUserFromStore(uid);

  try {
    await updateDoc(doc(db, "users", user.uid), {
      lessonCount: user.lessonCount,
    });
    console.log("Update document");
  } catch (err) {
    console.error("Error while decreasing the error amount: ", err);
  }
}

async function addRendezvous(date: Date) {
  const currentTimeData = await getCurrentTime();
  const dateNow = new Date(currentTimeData.datetime);
  try {
    if (dateNow.getHours() < SYSTEM_CLOSE_TIME) {
      const user = store.getState().users.self;
      const rendezvousObj = {
        name: user.fullName,
        cancelled: false,
        date: Timestamp.fromDate(new Date(date)),
        uid: user.uid,
        completed: false,
      } as any;
      await decreaseLessonAmount(user.uid);
      const rendezvousRef = await addDoc(
        collection(db, "rendezvous"),
        rendezvousObj
      );
      console.log("Add rendezvous document");
      rendezvousObj.date = rendezvousObj.date.seconds as any;
      rendezvousObj.id = rendezvousRef.id;
      store.dispatch(addUserDetailRendezvous(rendezvousObj));
      await updateDoc(doc(db, "users", user.uid), {
        rendezvous: arrayUnion(rendezvousRef.id),
      });
      console.log("Update rendezvous document");
    } else {
      throw new Error("Sistem 19:00'dan sonra kapanır");
    }
  } catch (err: any) {
    Store.addNotification({
      title: "Hata",
      message: err.message,
      type: "danger",
      container: "bottom-right",
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  }
}

async function increaseLessonAmount(uid: string, amount = 1) {
  store.dispatch(decreaseLessonCount({ uid, amount }));
  const user = await getUserFromStore(uid);
  console.log(user);

  try {
    await updateDoc(doc(db, "users", user.uid), {
      lessonCount: user.lessonCount,
    });
    console.log("Update document");
  } catch (err) {
    console.error("Error while decreasing the error amount: ", err);
  }
}

async function addClass(uid: any, amount = 1) {
  let user = await getUserFromStore(uid);
  if (!user) {
    try {
      const newUser = await getUserWithUID(uid);
      user = newUser;
      store.dispatch(addToUsers([user]));
    } catch (err: any) {
      console.error(err);
    }
  }
  try {
    await updateDoc(doc(db, "users", uid), {
      lessonCount: user.lessonCount + amount,
    });
    store.dispatch(increaseLessonCount({ uid, amount }));
  } catch (err) {
    console.error(err);
  }
}

async function getCurrentTime() {
  const res = await fetch("http://worldtimeapi.org/api/timezone/Turkey");
  const data = await res.json();
  return data;
}

export {
  signIn,
  createNewAccount,
  getUser,
  getPaginatedUsers,
  addRendezvous,
  getAllRendezvous,
  getRendezvousDay,
  getAllRendezvousUser,
  cancelRendezvous,
  addClass,
  activateUser,
  getCurrentTime,
  cancelDay,
  searchUserByName,
  getUserWithUID,
};
