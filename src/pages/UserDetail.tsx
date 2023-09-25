import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function UserDetail() {
  const { uid } = useParams();
  const userData = useSelector((state) => state.users.allUsers[uid]);
  console.log(userData.data());
  return <div>{userData.data().birthPlace}</div>;
}
