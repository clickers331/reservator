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
      <NavLink to="/">home</NavLink>
      {userData.admin ? (
        <>
          <NavLink to="admin/rendezvous">all rendezvous</NavLink>
          <NavLink to="admin/users">members</NavLink>
        </>
      ) : (
        <NavLink to="my-rendezvous">my rendezvous</NavLink>
      )}
      <SignOutLink
        to="/signin"
        onClick={(e) => {
          signOut(auth);
        }}
      >
        sign out
      </SignOutLink>
    </RootNav>
  );
}
