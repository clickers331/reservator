import React from "react";
import styled from "styled-components";
import ContainerNav from "./ContainerNav";
import { NavLink } from "react-router-dom";

const StyledMonthNav = styled(ContainerNav)`
  padding-left: 0;
  padding-right: 0;
`;

const MonthLink = styled(NavLink)`
  color: black;
`;

export default function MonthNav() {
  return (
    <StyledMonthNav>
      <MonthLink to="../month/2023/1">january</MonthLink>
      <MonthLink to="../month/2023/2">february</MonthLink>
      <MonthLink to="../month/2023/3">march</MonthLink>
      <MonthLink to="../month/2023/4">april</MonthLink>
      <MonthLink to="../month/2023/5">may</MonthLink>
      <MonthLink to="../month/2023/6">june</MonthLink>
      <MonthLink to="../month/2023/7">july</MonthLink>
      <MonthLink to="../month/2023/8">august</MonthLink>
      <MonthLink to="../month/2023/9">september</MonthLink>
      <MonthLink to="../month/2023/10">october</MonthLink>
      <MonthLink to="../month/2023/11">november</MonthLink>
      <MonthLink to="../month/2023/12">december</MonthLink>
    </StyledMonthNav>
  );
}
