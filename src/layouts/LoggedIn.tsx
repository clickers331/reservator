import styled from "styled-components";
import RootNav from "../components/navs/RootNav";
import { NavLink, Link, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseObjects";

const BodyContainer = styled.div`
  min-height: 100vh;
`;
export default function LoggedIn() {
  const { Header, LightText, LinkContainer, OutletContainer } = RootNav;
  return (
    <RootNav>
      <Header>
        BKK <LightText>Randevu</LightText>
      </Header>
      <LinkContainer>
        <NavLink to="/">ev</NavLink>
        <NavLink to="/rendezvous">tüm randevular</NavLink>
        <NavLink to="/users">üyeler</NavLink>
      </LinkContainer>
      <LinkContainer>
        <Link
          to="/signin"
          onClick={(e) => {
            signOut(auth);
          }}
        >
          çıkış
        </Link>
      </LinkContainer>
    </RootNav>
  );
}
