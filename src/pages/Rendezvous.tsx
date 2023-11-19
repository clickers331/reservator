import Container from "../containers/Container";
import ContainerNav from "../components/navs/ContainerNav";
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "styled-components";

export default function Rendezvous() {
  const theme = useTheme();
  const today = new Date(Date.now());
  return (
    <>
      <h1>Randevular</h1>
      <Container>
        <ContainerNav backgroundColor={theme.colors.primaries[500]}>
          <NavLink
            to={`calendar/day/${today.getFullYear()}/${
              today.getMonth() + 1
            }/${today.getDate()}`}
          >
            gün
          </NavLink>
          <NavLink to="list">liste</NavLink>
        </ContainerNav>
        <Outlet />
      </Container>
    </>
  );
}
