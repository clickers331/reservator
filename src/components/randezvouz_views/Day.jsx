import React, { Suspense } from "react";
import TimeCard from "../TimeCard";
import { nanoid } from "nanoid";
import { getAllRendezvousDay } from "../../api";
import { defer, useLoaderData, Await, useParams } from "react-router-dom";
import styled, { useTheme } from "styled-components";

async function loader({ params: { month, day } }) {
  return defer({ dayData: getAllRendezvousDay("2023", month, day) });
}

const StyledDay = styled.div`
  background-color: ${({ theme }) => theme.colors.neutrals[500]};
  text-align: center;
  padding: 2em;
  width: 90%;
  max-width: 600px;
  margin: 1em auto;
  border-radius: 30px;
  color: ${({ theme }) => theme.colors.neutrals[100]};
`;

const StyledHourHeader = styled.h2`
  font-size: 2rem;
`;

const StyledDateHeader = styled.h2`
  color: ${({ theme }) => theme.colors.neutrals[200]};
  font-size: 1.4rem;
`;

const StyledRendezvousItem = styled.p`
  background-color: ${({ theme }) => theme.colors.primaries[800]};
  font-size: 1.4rem;
  padding: 0.5em;
  border-radius: 10px;
  margin: 0;
`;

const StyledRendezvousItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
`;

export default function Day() {
  const { dayData } = useLoaderData();
  const { month, day } = useParams();
  const theme = useTheme();
  return (
    <Suspense fallback={<h1>Yukleniveriveriyor</h1>}>
      <Await resolve={dayData}>
        {(dayData) => {
          return (
            <StyledDay>
              <StyledDateHeader>
                {day} {month}
              </StyledDateHeader>
              {dayData.map((day) => {
                return (
                  <div>
                    <StyledHourHeader>
                      {new Date(day[0].date).getHours()}:00
                    </StyledHourHeader>
                    <StyledRendezvousItemContainer>
                      {day.map((rendezvous) => (
                        <StyledRendezvousItem>
                          {rendezvous.name}
                        </StyledRendezvousItem>
                      ))}
                    </StyledRendezvousItemContainer>
                  </div>
                );
              })}
            </StyledDay>
          );
        }}
      </Await>
    </Suspense>
  );
}

Day.loader = loader;
