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
      <MonthLink to="../month/2023/1">ocak</MonthLink>
      <MonthLink to="../month/2023/2">şubat</MonthLink>
      <MonthLink to="../month/2023/3">mart</MonthLink>
      <MonthLink to="../month/2023/4">nisan</MonthLink>
      <MonthLink to="../month/2023/5">mayıs</MonthLink>
      <MonthLink to="../month/2023/6">haziran</MonthLink>
      <MonthLink to="../month/2023/7">temmuz</MonthLink>
      <MonthLink to="../month/2023/8">ağustos</MonthLink>
      <MonthLink to="../month/2023/9">eylül</MonthLink>
      <MonthLink to="../month/2023/10">ekim</MonthLink>
      <MonthLink to="../month/2023/11">kasım</MonthLink>
      <MonthLink to="../month/2023/12">aralık</MonthLink>
    </StyledMonthNav>
  );
}
