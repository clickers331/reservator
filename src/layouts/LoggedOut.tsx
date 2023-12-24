import { NavLink } from "react-router-dom";
import RootNav from "../components/navs/RootNav";

export default function LoggedOut() {
  return (
    <RootNav admin={false}>
      <NavLink to="/signin">sign in</NavLink>
      <NavLink to="/signup">create an account</NavLink>
    </RootNav>
  );
}
