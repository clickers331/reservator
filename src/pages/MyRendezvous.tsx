import styled from "styled-components";
import { getAllRendezvousUser } from "../api";
import UserRendezvous from "../components/UserRendezvous";
import Container from "../containers/Container";
import AddRendezvousForm from "../components/AddRendezvousForm";
import { useLoaderData } from "react-router-dom";

async function loader() {
  const unsub = await getAllRendezvousUser();
  return unsub;
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
    unsub();
  }
  return (
    <Container maxWidth="1400px">
      <Container.Content>
        <StyledMyRendezvous>
          <AddRendezvousForm />
          <h1>Randevularım</h1>
          <UserRendezvous />
        </StyledMyRendezvous>
      </Container.Content>
    </Container>
  );
}

MyRendezvous.loader = loader;
