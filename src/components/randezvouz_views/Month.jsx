import React, { Suspense } from "react";
import ContainerNav from "../ContainerNav";
import styled from "styled-components";
import { getAllRendezvousFormatted } from "../../api";
import TimeCard from "../TimeCard";
import { defer, Await, useLoaderData } from "react-router-dom";
import Error from "../Error";

const WeekRow = styled(ContainerNav)`
  padding-left: 0;
  padding-right: 0;
`;

const WeekRowItem = styled.p`
  width: ${100 / 7}%;
  text-align: center;
`;

const MonthGrid = styled.div`
  display: grid;
  border: red solid 1px;
  grid-template-columns: repeat(7, 1fr);
  gap: 1em;
  justify-items: center;
  align-content: center;
  & > * {
    width: 100%;
    text-align: center;
  }
`;

export async function loader() {
  const rendezvousData = getAllRendezvousFormatted();
  return defer({ rendezvousData: rendezvousData });
}

export default function Month() {
  const { rendezvousData } = useLoaderData();

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
      <MonthGrid>
        <Suspense fallback={<h1>NO WAY </h1>}>
          <Await resolve={rendezvousData} errorElement={<Error />}>
            {(rendezvousData) =>
              rendezvousData.map((data, idx) => {
                return (
                  <TimeCard>
                    <p>{idx}</p>
                    {data.map(({ name, date }) => {
                      return (
                        <p>
                          {new Date(date).getHours()}:00|{name}
                        </p>
                      );
                    })}
                  </TimeCard>
                );
              })
            }
          </Await>
        </Suspense>
      </MonthGrid>
    </>
  );
}
