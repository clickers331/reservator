import React from "react";
import Container from "../components/Container";
import ContainerNav from "../components/navs/ContainerNav";
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "styled-components";

export default function Rendezvous() {
  const theme = useTheme();

  return (
    <>
      <h1>Randevular</h1>
      <Container>
        <ContainerNav backgroundColor={theme.colors.primaries[500]}>
          <NavLink to="calendar">takvim</NavLink>
          <NavLink to="list">liste</NavLink>
        </ContainerNav>
        <Outlet />
      </Container>
    </>
  );
}
