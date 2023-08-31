import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import ContainerNav from "./navs/ContainerNav";
import { useTheme } from "styled-components";
import { monthNamesURL as monthNames, getWeekNo } from "../utils";
//get all data
//filter them out based on their week day (monday, tuesday, wednesday, ...)
//map those to corresponding columns (monday, tuesday, wednesday, ...)

export default function Calendar() {
  const theme = useTheme();
  const today = new Date();
  return (
    <>
      <ContainerNav backgroundColor={theme.colors.primaries[500]}>
        <NavLink
          to={`month/${today.getFullYear()}/${today.getMonth() + 1}`}
          end
        >
          ay
        </NavLink>
        <NavLink to={`week/${getWeekNo(today)}`}>hafta</NavLink>
        <NavLink
          to={`day/${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`}
        >
          gün
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
