import styled from "styled-components";
import { getAllRendezvousUser } from "../api";
import UserRendezvous from "../components/UserRendezvous";
import Container from "../containers/Container";
import AddRendezvousForm from "../components/AddRendezvousForm";

async function loader() {
  getAllRendezvousUser();
  return null;
}

const StyledMyRendezvous = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 2em;
`;

export default function MyRendezvous() {
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
