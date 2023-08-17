import React from "react";
import ContainerNav from "../ContainerNav";
import ColumnContainer from "../ColumnContainer";
import styled from "styled-components";

const WeekRow = styled(ContainerNav)`
  padding-left: 0;
  padding-right: 0;
`;

const WeekRowItem = styled.p`
  width: ${100 / 7}%;
  text-align: center;
`;

export default function Month() {
  return (
    <>
      <WeekRow>
        <WeekRowItem>pazartesi</WeekRowItem>
        <WeekRowItem>sali</WeekRowItem>
        <WeekRowItem>carsamba</WeekRowItem>
        <WeekRowItem>persembe</WeekRowItem>
        <WeekRowItem>cuma</WeekRowItem>
        <WeekRowItem>cumartesi</WeekRowItem>
        <WeekRowItem>pazar</WeekRowItem>
      </WeekRow>
      <ColumnContainer></ColumnContainer>
    </>
  );
}
