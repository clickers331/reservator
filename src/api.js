import { users, userDetailData, allRandezvous } from "./data/mockDatabase.js";
import { flattenObjectSimple } from "./utils.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function getAllUsers() {
  await sleep(1000);
  return await users;
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

async function getOneUser(uid) {
  const user = users.filter((user) => user.uid === uid)[0];
  if (!user) {
    throw new Error("User not found!");
  }
  const userDetail = userDetailData[uid];

  return {
    email: user.email,
    uid: user.uid,
    ...userDetail,
  };
}

async function getAllRendezvous() {
  await sleep(1000);
  return allRandezvous;
}

async function getAllRendezvousYearFlat(year) {
  const rendezvous = await getAllRendezvous();
  const yearRendezvous = rendezvous[year];
  return flattenObjectSimple(yearRendezvous);
}

async function getAllRendezvousFormatted(year, month) {
  const rendezvous = await getAllRendezvous();
  const monthDayCount = new Date(
    year,
    Object.keys(rendezvous[year]).indexOf(month) + 1,
    0
  ).getDate();
  const rendezvousSelected = rendezvous[year][month]; //undefined for some reason
  if (!rendezvousSelected) return [];
  const formattedArr = [];

  //Put all of the objects that are on the same day into an array of their own, so mapping is easier
  for (let i = 1; i < monthDayCount + 1; i++) {
    formattedArr.push(
      rendezvousSelected.filter((item) => new Date(item.date).getDate() === i)
    );
  }
  return formattedArr;
}

async function getAllRendezvousDay(year, month, day) {
  const rendezvous = await getAllRendezvousFormatted(year, month);
  const rendezvousDay = rendezvous[day - 1];

  if (!Array.isArray(rendezvousDay)) return null;
  const formattedDay = {};
  rendezvousDay.forEach((item) => {
    const hour = new Date(item.date).getHours();
    formattedDay[hour]
      ? formattedDay[hour].push(item)
      : (formattedDay[hour] = [item]);
  });
  return formattedDay;
}

async function getAllRendezvousWeek(year) {
  const rendezvous = await getAllRendezvousYearFlat(year);
  // Generate an array of arrays arrays, each array representing a week, and each item in the array (which is an array) representing a day.
  const weeks = [];
  let week = [];
  let day = [];
  let dayOfTheWeek = 0;
  let weekCount = 0;
  for (let i = 0; i < rendezvous.length; i++) {
    const currentDay = new Date(rendezvous[i].date).getDay();
    if (i === 0) dayOfTheWeek = currentDay;
    if (currentDay !== dayOfTheWeek) {
      dayOfTheWeek = currentDay;
      week.push(day);
      day = [];
    }
    if (week.length === 7) {
      weeks.push(week);
      week = [];
      weekCount++;
    }
    day.push(rendezvous[i]);
  }
  weeks.push(week);
  return weeks;
}

console.log(await getAllRendezvousWeek("2023"));

/*
[
  {
    date: new Date
  }
  {
    date: new Date
  }
  {
    date: new Date
  }
  {
    date: new Date
  }
]
*/

export {
  getAllUsers,
  getOneUser,
  getAllUsersWithDetails,
  getAllRendezvous,
  getAllRendezvousFormatted,
  getAllRendezvousDay,
};
