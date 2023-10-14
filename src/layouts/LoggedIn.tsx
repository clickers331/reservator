import RootNav from "../components/navs/RootNav";
import { NavLink, Link, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseObjects";
import styled from "styled-components";
import { useSelector } from "react-redux";

const SignOutLink = styled(Link)<StyledProps>`
  &:hover {
    color: ${({ theme }) => theme.colors.accents.red[500]} !important;
  }
`;

const Seperator = styled.span`
  font-weight: 400;
  font-size: 1.5rem;
`;

export default function LoggedIn() {
  const { Header, LightText, LinkContainer, SecondaryText } = RootNav;
  const userData = useSelector((state: any) => state.user);
  return (
    <RootNav>
      <Header>
        BKK <LightText>Randevu</LightText>
        {userData.admin ? (
          <>
            <Seperator> | </Seperator>
            <SecondaryText>Admin</SecondaryText>
          </>
        ) : null}
      </Header>
      <LinkContainer>
        <NavLink to="/">ev</NavLink>
        {userData.admin ? (
          <>
            <NavLink to="admin/rendezvous">tüm randevular</NavLink>
            <NavLink to="admin/users">üyeler</NavLink>
          </>
        ) : (
          <NavLink to="my-rendezvous">randevularim</NavLink>
        )}
      </LinkContainer>
      <LinkContainer>
        <SignOutLink
          to="/signin"
          onClick={(e) => {
            signOut(auth);
          }}
        >
          çıkış
        </SignOutLink>
      </LinkContainer>
    </RootNav>
  );
}
