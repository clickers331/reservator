import styled from "styled-components";
import { getAllRendezvousUser } from "../api";
import UserRendezvous from "../components/UserRendezvous";
import Container from "../containers/Container";
import AddRendezvousForm from "../components/AddRendezvousForm";
import { useLoaderData } from "react-router-dom";

async function loader() {
  const unsub = await getAllRendezvousUser();
  return unsub || null;
}

const StyledMyRendezvous = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 2em;
`;

export default function MyRendezvous() {
  const unsub = useLoaderData();
  if (window.location.pathname !== "/my-rendezvous") {
    if (typeof unsub === "function") {
      unsub();
    } else {
      console.error("unsub is null");
    }
  }
  return (
    <Container maxWidth="1400px">
      <Container.Content>
        <StyledMyRendezvous>
          <AddRendezvousForm />
          <h1>My Rendezvous</h1>
          <UserRendezvous />
        </StyledMyRendezvous>
      </Container.Content>
    </Container>
  );
}

MyRendezvous.loader = loader;
