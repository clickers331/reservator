import { users, userDetailData, allRandezvous } from "./data/mockDatabase.js";

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

async function getAllRendezvousFormatted() {
  const rendezvous = await getAllRendezvous();
  const formattedArr = [];
  for (let i = 1; i < 31; i++) {
    formattedArr.push(
      rendezvous.filter((item) => new Date(item.date).getDate() === i)
    );
  }
  return formattedArr;
}

getAllRendezvousFormatted().then((data) => console.log(data));

export {
  getAllUsers,
  getOneUser,
  getAllUsersWithDetails,
  getAllRendezvous,
  getAllRendezvousFormatted,
};
