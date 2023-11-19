import RootNav from "../components/navs/RootNav";
import { NavLink, Link, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseObjects";
import styled from "styled-components";
import { useSelector } from "react-redux";

const SignOutLink = styled(Link)<StyledProps>`
  color: ${({ theme }) => theme.colors.accents.red[300]} !important;
  position: absolute;
  bottom: 4em;
  &:hover {
    color: ${({ theme }) => theme.colors.accents.red[700]} !important;
  }
`;

export default function LoggedIn() {
  const userData = useSelector((state: any) => state.users.self);
  return (
    <RootNav admin={userData.admin}>
      <NavLink to="/">ev</NavLink>
      {userData.admin ? (
        <>
          <NavLink to="admin/rendezvous">tüm randevular</NavLink>
          <NavLink to="admin/users">üyeler</NavLink>
        </>
      ) : (
        <NavLink to="my-rendezvous">randevularim</NavLink>
      )}
      <SignOutLink
        to="/signin"
        onClick={(e) => {
          signOut(auth);
        }}
      >
        çıkış
      </SignOutLink>
    </RootNav>
  );
}
