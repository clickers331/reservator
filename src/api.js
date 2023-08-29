import { users, userDetailData, allRandezvous } from "./data/mockDatabase.js";

const EARLIEST_HOUR = 5;

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
  const formattedDay = [[], [], [], []];
  rendezvousDay.forEach((item) => {
    const hour = new Date(item.date).getHours() - EARLIEST_HOUR;
    formattedDay[hour].push(item);
  });
  return formattedDay;
}

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
