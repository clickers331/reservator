import React from "react";
import { Container } from "../components/commonComponents";
import Calendar from "../components/Calendar";
import ContainerNav from "../components/ContainerNav";
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "styled-components";

export default function Rendezvous() {
  const theme = useTheme();

  return (
    <Container>
      <ContainerNav backgroundColor={theme.colors.primaries[500]}>
        <NavLink to="takvim">takvim</NavLink>
        <NavLink to="tum-randevular">tüm randevular</NavLink>
      </ContainerNav>
      <Outlet />
    </Container>
  );
}
