import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import {
  addRendezvous,
  decreaseLessonAmount,
  getAllRendezvousFB,
  getAllRendezvousUser,
} from "../api";
import UserRendezvous from "../components/UserRendezvous";
import Container from "../containers/Container";
import { ReduxState } from "../redux/rootReducer";
import AddRendezvousForm from "../components/AddRendezvousForm";

async function loader() {
  getAllRendezvousUser();
  return null;
}

export default function MyRendezvous() {
  return (
    <Container maxWidth="1400px">
      <Container.Content>
        <AddRendezvousForm />
        <h1>Randevularım</h1>
        <UserRendezvous />
      </Container.Content>
    </Container>
  );
}

MyRendezvous.loader = loader;
