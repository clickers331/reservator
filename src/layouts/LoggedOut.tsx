import { NavLink } from "react-router-dom";
import RootNav from "../components/navs/RootNav";

export default function LoggedOut() {
  const { Header, LightText, LinkContainer, OutletContainer } = RootNav;
  return (
    <RootNav>
      <Header>
        BKK <LightText>Randevu</LightText>
      </Header>
      <LinkContainer>
        <NavLink to="/signin">giriş yap</NavLink>
        <NavLink to="/signup">hesap oluştur</NavLink>
      </LinkContainer>
    </RootNav>
  );
}
