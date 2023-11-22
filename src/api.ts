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
  addDoc,
  where,
  startAt,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "./firebaseObjects.js";
import store from "./redux/store.js";
import {
  increaseLessonCount,
  decreaseLessonCount,
  addToUsers,
  resetUsers,
} from "./redux/users/users.actions.js";
import {
  setRendezvous,
  setUserDetailRendezvous,
  setDayRendezvous,
} from "./redux/rendezvous/rendezvous.actions.js";
import { Store } from "react-notifications-component";
import { authCodes } from "./utils.js";
import { DayRendezvous } from "./redux/rendezvous/rendezvous.reducer.js";

const SYSTEM_CLOSE_TIME = 23;

export interface Rendezvous {
  id: string;
  name: string;
  date: number;
  cancelled: boolean;
  completed: boolean;
  uid: string;
}

export interface User {
  uid: string;
  email: string;
  fullName: string;
  phone: string;
  birthDate: number;
  bloodType: string;
  active: boolean;
  lessonCount: number;
}

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
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const userData = querySnapshot.docs;
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
  });
  return unsubscribe;
}

async function getAllRendezvous() {
  try {
    const q = query(
      collection(db, "rendezvous"),
      orderBy("date"),
      startAt(Date.now())
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const rendezvous = querySnapshot.docs;
      const serializableRendezvous = rendezvous.map((rend) => {
        const data = rend.data();
        data.id = rend.id;
        data.date = data.date.seconds;
        return data;
      });
      store.dispatch(setRendezvous(serializableRendezvous));
    });

    return unsubscribe;
  } catch (err) {
    console.error(err);
  }
}

async function activateUser(uid: any) {
  const user = store.getState().users.allUsers[uid] as any;
  try {
    await updateDoc(doc(db, "users", uid), {
      active: !user.active,
    });
  } catch (err) {
    console.error(err);
  }
}

async function getRendezvousDay() {
  const newDate = new Date();
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

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = querySnapshot.docs;

      const rendezvous: DayRendezvous = {};
      docs.forEach((doc) => {
        const data = {
          ...doc.data(),
          id: doc.id,
          date: doc.data().date.seconds * 1000,
        };
        const date = new Date(data.date);
        const hour = `${date.getHours()}`;
        if (rendezvous[hour]) {
          rendezvous[hour].push(data as Rendezvous);
        } else {
          rendezvous[date.getHours()] = [data as Rendezvous];
        }
      });
      store.dispatch(setDayRendezvous(rendezvous));
    });
    return unsubscribe;
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
    const docs = await getDocs(q);
    docs.forEach(async (rendDoc) => {
      const docData = rendDoc.data();
      if (!docData.cancelled) {
        cancelRendezvous(docData);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

async function cancelRendezvous(rendData: any) {
  const rendId = rendData.id;
  const user = await getUserFromStore(rendData.uid);
  const currentTimeData = await getCurrentTime();
  const dateNow = new Date(currentTimeData.datetime);
  try {
    if (dateNow.getHours() < SYSTEM_CLOSE_TIME) {
      await deleteDoc(doc(db, "rendezvous", rendId));
      await addClass(user.uid, 1);
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
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("User rendezvous updated");
      const userRendezvous = querySnapshot.docs;
      const serializableRendezvous = userRendezvous.map((rend) => {
        const data = rend.data();
        data.date = data.date.seconds;
        data.id = rend.id;
        return data;
      });
      store.dispatch(setUserDetailRendezvous(serializableRendezvous));
    });
    return unsubscribe;
  } catch (error) {
    console.error(error);
  }
}

async function searchUserByName(name: string) {
  const q = query(
    collection(db, "users"),
    where("fullName", ">=", name),
    where("fullName", "<=", name + "\uf8ff"),
    limit(15)
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
  try {
    const user = await getDoc(doc(db, "users", uid));
    const userData = user.data();
    userData.birthDate = userData.birthDate.seconds * 1000;
    return userData;
  } catch (err) {
    console.error(null);
    return null;
  }
}

async function subscribeToUserWithUID(uid: string) {
  const unsubscribe = onSnapshot(doc(db, "users", uid), (doc) => {
    console.log("User updated");
    const userObj = {
      uid: uid,
      ...doc.data(),
    } as any;
    userObj.birthDate = userObj.birthDate.seconds;
    store.dispatch(addToUsers({ [uid]: userObj }));
  });
  return unsubscribe;
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
      await setDoc(doc(db, `users/${user.user.uid}`), {
        email: values.email,
        fullName: values.fullName,
        phone: values.phone,
        birthDate: Timestamp.fromDate(new Date(values.birthDate as string)),
        bloodType: values.bloodType,
        active: false,
        lessonCount: 0,
      });
    }
  } catch (err: any) {
    Store.addNotification({
      title: "Hata",
      message: authCodes[err.code.slice(5) as string] || err.message,
      type: "danger",
      container: "bottom-right",
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
    console.error(err.message);
  }
}

async function signIn(values: AuthFormValues) {
  try {
    await signInWithEmailAndPassword(auth, values.email, values.password);
  } catch (err: any) {
    Store.addNotification({
      title: "Hata",
      message: authCodes[err.code.slice(5) as string] || err.message,
      type: "danger",
      container: "bottom-right",
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
    console.error(err.message);
  }
}

async function getUserFromStore(uid: string) {
  let user =
    store.getState().users.allUsers[uid] || store.getState().users.self;
  if (!user || user.uid !== uid) {
    user = await getUserWithUID(uid);
    if (user) {
      store.dispatch(addToUsers({ [uid]: user }));
      return user;
    } else {
      console.error("User not found");
      return null;
    }
  } else {
    return user;
  }
}

async function decreaseLessonAmount(uid: string, amount = 1) {
  const user = await getUserFromStore(uid);

  try {
    await updateDoc(doc(db, "users", user.uid), {
      lessonCount: user.lessonCount - amount,
    });
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
      rendezvousObj.date = rendezvousObj.date.seconds as any;
      rendezvousObj.id = rendezvousRef.id;
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

async function addClass(uid: any, amount = 1) {
  let user: User = await getUserFromStore(uid);
  try {
    await updateDoc(doc(db, "users", uid), {
      lessonCount: user.lessonCount + amount,
    });
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
  subscribeToUserWithUID,
};
