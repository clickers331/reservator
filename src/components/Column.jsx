import React from "react";
import TimeCard from "./TimeCard";
import styled from "styled-components";
const StyledColumn = styled.div`
  padding: 1em;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  justify-content: flex-start;
`;

export default function Column() {
  return (
    <StyledColumn>
      <TimeCard></TimeCard>
      <TimeCard></TimeCard>
      <TimeCard></TimeCard>
      <TimeCard></TimeCard>
      <TimeCard></TimeCard>
      <TimeCard></TimeCard>
    </StyledColumn>
  );
}
