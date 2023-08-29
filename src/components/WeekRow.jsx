import React from "react";
import styled from "styled-components";
import ContainerNav from "./navs/ContainerNav";

const WeekRowItem = styled.p`
  width: ${100 / 7}%;
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
`;

const StyledWeekRow = styled(ContainerNav)`
  padding-left: 0;
  padding-right: 0;
`;
export default function WeekRow() {
  return (
    <StyledWeekRow>
      <WeekRowItem>pazartesi</WeekRowItem>
      <WeekRowItem>salı</WeekRowItem>
      <WeekRowItem>carşamba</WeekRowItem>
      <WeekRowItem>perşembe</WeekRowItem>
      <WeekRowItem>cuma</WeekRowItem>
      <WeekRowItem>cumartesi</WeekRowItem>
      <WeekRowItem>pazar</WeekRowItem>
    </StyledWeekRow>
  );
}
