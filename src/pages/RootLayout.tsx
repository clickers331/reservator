import styled from "styled-components";
import LoggedIn from "../layouts/LoggedIn";
import { Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseObjects";
import LoggedOut from "../layouts/LoggedOut";
import RootNav from "../components/navs/RootNav";

const BodyContainer = styled.div`
  min-height: 100vh;
`;
export default function RootLayout() {
  const [user] = useAuthState(auth);
  return (
    <BodyContainer>
      {user ? <LoggedIn /> : <LoggedOut />}
      <RootNav.OutletContainer>
        <Outlet />
      </RootNav.OutletContainer>
    </BodyContainer>
  );
}
