import { users, userDetailData } from "./data/mockDatabase.js";

async function getAllUsers() {
  delay();
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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

getAllUsersWithDetails();

export { getAllUsers, getOneUser, getAllUsersWithDetails };
