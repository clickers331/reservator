import { NavLink } from "react-router-dom";
import RootNav from "../components/navs/RootNav";

export default function LoggedOut() {
  return (
    <RootNav admin={false}>
      <NavLink to="/signin">giriş yap</NavLink>
      <NavLink to="/signup">hesap oluştur</NavLink>
    </RootNav>
  );
}
