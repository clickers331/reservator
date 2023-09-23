import RootNav from "../components/navs/RootNav";
import { NavLink, Link, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseObjects";

export default function LoggedIn() {
  const { Header, LightText, LinkContainer } = RootNav;
  return (
    <RootNav>
      <Header>
        BKK <LightText>Randevu</LightText>
      </Header>
      <LinkContainer>
        <NavLink to="/">ev</NavLink>
        <NavLink to="/admin/rendezvous">tüm randevular</NavLink>
        <NavLink to="/admin/users">üyeler</NavLink>
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
