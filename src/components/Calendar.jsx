import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import ContainerNav from "./navs/ContainerNav";
import { useTheme } from "styled-components";
import { monthNamesURL as monthNames } from "../utils";
//get all data
//filter them out based on their week day (monday, tuesday, wednesday, ...)
//map those to corresponding columns (monday, tuesday, wednesday, ...)

export default function Calendar() {
  const theme = useTheme();
  const today = new Date();
  return (
    <>
      <ContainerNav backgroundColor={theme.colors.primaries[500]}>
        <NavLink to={`month/${monthNames[today.getMonth()]}`} end>
          ay
        </NavLink>
        <NavLink to="week">hafta</NavLink>
        <NavLink
          to={`month/${monthNames[today.getMonth()]}/${today.getDate()}`}
        >
          gun
        </NavLink>
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
