import React, { Suspense } from "react";
import styled from "styled-components";
import TimeCard from "../TimeCard";
import WeekRow from "../WeekRow";
import { defer, Await, useParams } from "react-router-dom";

const StyledWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5em;
  padding: 2em;
  justify-content: stretch;
  align-items: stretch;
  & > * {
    width: 100%;
    text-align: center;
  }
`;

export default function Week() {
  return (
    <>
      <WeekRow />
      <StyledWeek>
        <TimeCard></TimeCard>
        <TimeCard></TimeCard>
        <TimeCard></TimeCard>
        <TimeCard></TimeCard>
        <TimeCard></TimeCard>
        <TimeCard></TimeCard>
        <TimeCard></TimeCard>
      </StyledWeek>
    </>
  );
}
