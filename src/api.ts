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
} from "firebase/firestore";
import {
  users,
  userDetailData,
  allRandezvous,
  type User,
  type AllRandezvous,
  type UserDetail,
  Rendezvous,
} from "./data/mockDatabase.js";
import { flattenObjectSimple } from "./utils.js";
import { db, auth } from "./firebaseObjects.js";
import store from "./redux/store.js";
import { updateUserDetails } from "./redux/user/user.actions.js";
import { UserState } from "./redux/user/user.reducer.js";
import { addToUsers } from "./redux/users/users.actions.js";

export interface ErrorObject {
  error: string | number;
}

export interface FormattedDay {
  [key: `${number}` | number]: Rendezvous[];
}

export type Rendezvous2D = Rendezvous[][];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
async function getPaginatedUsers(lastRef?: any, lim = 10): Promise<any> {
  const q = query(
    collection(db, "users"),
    orderBy("birthDate"),
    startAfter(lastRef || 0),
    limit(lim)
  );
  const userData = await getDocs(q);
  const usersObj: User[] = [];
  userData.forEach((user) => (usersObj[user.id] = user as any));
  store.dispatch(addToUsers(usersObj));
  return userData;
}

async function getAllUsersWithDetails() {
  await sleep(1000);
  let detailedUsers = [];
  for (let i = 0; i < users.length; i++) {
    detailedUsers.push(getOneUser(users[i].uid));
  }
  const resolvedUsers = await Promise.all(detailedUsers);
  return resolvedUsers;
}

async function getOneUser(uid: string | number) {
  const user: User = users.filter((user) => user.uid === uid)[0];
  if (!user) {
    throw new Error("User not found!");
  }
  const userDetail: UserDetail = userDetailData[uid];

  return {
    email: user.email,
    uid: user.uid,
    ...userDetail,
  };
}

async function getAllRendezvous(): Promise<AllRandezvous> {
  await sleep(1000);
  return allRandezvous as AllRandezvous;
}
async function getAllRendezvousYearFlat(year: string | number) {
  const rendezvous: AllRandezvous = await getAllRendezvous();
  const yearRendezvous: Rendezvous[][] = rendezvous[year];
  return flattenObjectSimple<any>(yearRendezvous);
}

async function getAllRendezvousFormatted(
  year: string,
  month: string
): Promise<Rendezvous2D | ErrorObject> {
  console.log("Month is: ", month, "on line 156 in api.ts");
  const monthInt: number = parseInt(month);
  const yearInt: number = parseInt(year);
  const date: Date = new Date(yearInt, monthInt, 0);
  const rendezvous: AllRandezvous = await getAllRendezvous();
  const monthDayCount: number = date.getDate();
  const rendezvousSelected = rendezvous[year][monthInt - 1];
  if (!rendezvousSelected)
    return { error: "Month doesnt exist" } as ErrorObject;
  const formattedArr = [];

  //Put all of the objects that are on the same day into an array of their own, so mapping is easier
  for (let i = 1; i < monthDayCount + 1; i++) {
    formattedArr.push(
      rendezvousSelected.filter((item) => new Date(item.date).getDate() === i)
    );
  }
  return formattedArr;
}

async function getAllRendezvousDay(
  year: string,
  month: string,
  day: string
): Promise<FormattedDay | ErrorObject> {
  const dayInt: number = parseInt(day);

  const rendezvous: Rendezvous2D | ErrorObject =
    await getAllRendezvousFormatted(year, month);
  if ("error" in rendezvous) return rendezvous;
  const rendezvousDay: Rendezvous[] = rendezvous[dayInt - 1];

  if (!Array.isArray(rendezvousDay))
    return { error: "Day doesnt exist" } as ErrorObject;
  const formattedDay: FormattedDay = {};
  rendezvousDay.forEach((item) => {
    const hour = new Date(item.date).getHours();
    formattedDay[hour]
      ? formattedDay[hour].push(item)
      : (formattedDay[hour] = [item]);
  });
  return formattedDay;
}

async function getAllRendezvousWeek(
  year: string,
  weekNo: number = 1
): Promise<Rendezvous2D | ErrorObject> {
  const rendezvous = await getAllRendezvousYearFlat(year);

  const weeks = [];
  let week: Rendezvous2D = [];
  let day: Rendezvous[] = [];
  let dayOfTheWeekPointer: number = 0;
  let weekCount: number = 0;
  for (let i = 0; i < rendezvous.length; i++) {
    const currentDay = new Date(rendezvous[i].date).getDay();
    if (i === 0) dayOfTheWeekPointer = currentDay;
    if (currentDay !== dayOfTheWeekPointer) {
      if (currentDay === 2) {
        weeks.push(week);
        week = [];
        weekCount++;
      }
      dayOfTheWeekPointer = currentDay;
      week.push(day);
      day = [];
    }

    day.push(rendezvous[i]);
  }
  weeks.push(week);

  return weeks[weekNo]
    ? weeks[weekNo]
    : ({ error: "Week doesnt exist" } as ErrorObject);
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

export interface AuthFormValues {
  email: string;
  fullName?: string;
  phone?: string;
  bloodType?: string;
  birthPlace?: string;
  birthDate?: string;
  tcid: string;
}

async function createNewAccount(values: AuthFormValues) {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.tcid
    );
    if (user) {
      await setDoc(doc(db, `users/${user.user.uid}`), {
        email: values.email,
        fullName: values.fullName,
        phone: values.phone,
        birthDate: Timestamp.fromDate(new Date(values.birthDate as string)),
        birthPlace: values.birthPlace,
        bloodType: values.bloodType,
        active: false,
        lessonCount: 0,
      });
    }
  } catch (err: any) {
    console.log(err.message);
    return err;
    //TODO
    //[ ] Automatically log in if the email exists and the credentials are correct.
  }
}

async function signIn(values: AuthFormValues) {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.tcid
    );
    console.log(user.user.uid);
  } catch (err: any) {
    console.log(err.message);
  }
}

export {
  signIn,
  createNewAccount,
  getUser,
  getPaginatedUsers,
  getOneUser,
  getAllUsersWithDetails,
  getAllRendezvous,
  getAllRendezvousFormatted,
  getAllRendezvousDay,
  getAllRendezvousWeek,
};
