import React from "react";
import { NavLink, Outlet, defer } from "react-router-dom";
import ContainerNav from "./ContainerNav";
import { useTheme } from "styled-components";

//get all data
//filter them out based on their week day (monday, tuesday, wednesday, ...)
//map those to corresponding columns (monday, tuesday, wednesday, ...)

export async function loader({ request }) {
  console.log(request);
  return defer({ request });
}

export default function Calendar() {
  const theme = useTheme();

  return (
    <>
      <ContainerNav backgroundColor={theme.colors.primaries[500]}>
        <NavLink to="../takvim">ay</NavLink>
        <NavLink to="hafta">hafta</NavLink>
        <NavLink to="gun">gun</NavLink>
      </ContainerNav>
      <Outlet />
    </>
  );
}

// DATA STRUCTURE
/*
    {
        uid: String,
        date: Date
    }
*/
