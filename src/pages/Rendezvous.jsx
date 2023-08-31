import React from "react";
import { Container } from "../components/commonComponents";
import ContainerNav from "../components/navs/ContainerNav";
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "styled-components";

export default function Rendezvous() {
  const theme = useTheme();

  return (
    <Container>
      <ContainerNav backgroundColor={theme.colors.primaries[500]}>
        <NavLink to="calendar">takvim</NavLink>
        <NavLink to="list">tüm randevular</NavLink>
      </ContainerNav>
      <Outlet />
    </Container>
  );
}
