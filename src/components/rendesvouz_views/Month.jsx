import React, { Suspense } from "react";
import ContainerNav from "../navs/ContainerNav";
import styled, { useTheme } from "styled-components";
import { getAllRendezvousFormatted } from "../../api";
import TimeCard from "../TimeCard";
import { defer, Await, useLoaderData, NavLink } from "react-router-dom";
import Error from "../Error";
import { nanoid } from "nanoid";

const WeekRow = styled(ContainerNav)`
  padding-left: 0;
  padding-right: 0;
`;

const MonthRow = styled(ContainerNav)`
  padding-left: 0;
  padding-right: 0;
`;

const MonthRowItem = styled(NavLink)`
  color: black;
`;

const WeekRowItem = styled.p`
  width: ${100 / 7}%;
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
`;

const MonthGrid = styled.div`
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

async function loader({ params: { month } }) {
  return defer({
    rendezvousData: getAllRendezvousFormatted("2023", month),
  });
}

export default function Month() {
  const { rendezvousData } = useLoaderData();
  const theme = useTheme();
  return (
    <>
      <MonthRow>
        <MonthRowItem to="../month/january">ocak</MonthRowItem>
        <MonthRowItem to="../month/february">şubat</MonthRowItem>
        <MonthRowItem to="../month/march">mart</MonthRowItem>
        <MonthRowItem to="../month/april">nisan</MonthRowItem>
        <MonthRowItem to="../month/may">mayıs</MonthRowItem>
        <MonthRowItem to="../month/june">haziran</MonthRowItem>
        <MonthRowItem to="../month/july">temmuz</MonthRowItem>
        <MonthRowItem to="../month/august">ağustos</MonthRowItem>
        <MonthRowItem to="../month/september">eylül</MonthRowItem>
        <MonthRowItem to="../month/october">ekim</MonthRowItem>
        <MonthRowItem to="../month/november">kasım</MonthRowItem>
        <MonthRowItem to="../month/december">aralık</MonthRowItem>
      </MonthRow>
      <WeekRow>
        <WeekRowItem>pazartesi</WeekRowItem>
        <WeekRowItem>salı</WeekRowItem>
        <WeekRowItem>carşamba</WeekRowItem>
        <WeekRowItem>perşembe</WeekRowItem>
        <WeekRowItem>cuma</WeekRowItem>
        <WeekRowItem>cumartesi</WeekRowItem>
        <WeekRowItem>pazar</WeekRowItem>
      </WeekRow>
      <MonthGrid>
        <Suspense fallback={<h1>Takvim Yükleniyor...</h1>}>
          <Await resolve={rendezvousData} errorElement={<Error />}>
            {(rendezvousData) => {
              if (rendezvousData.length == 0)
                return <h1>Bu ay hiçbir randevu yok</h1>;
              return rendezvousData.map((data, idx) => {
                if (data.length == 0)
                  return (
                    <TimeCard key={nanoid()} day={idx + 1}>
                      <p>{idx + 1}</p>
                      <p>Bugün kürekçi yok</p>
                    </TimeCard>
                  );
                const currentDate = new Date(data[0].date);
                const currentWeekDay = currentDate.getDay();
                const currentMonthDay = currentDate.getDate();
                return (
                  <TimeCard
                    key={nanoid()}
                    day={currentMonthDay}
                    startIndex={currentWeekDay}
                    shorten
                  >
                    <p>{idx + 1}</p>
                    {...data.map(({ name, date }) => {
                      return (
                        <p key={nanoid()}>
                          <span
                            style={{
                              width: "30%",
                              textAlign: "right",
                              fontWeight: "700",
                              color: theme.colors.neutrals[200],
                              fontSize: "1em",
                              padding: "0.2em",
                            }}
                          >
                            {new Date(date).getHours()}:00
                          </span>
                          <span
                            style={{
                              width: "70%",
                              textAlign: "left",
                              fontWeight: "700",
                              color: theme.colors.neutrals[100],
                              fontSize: "1.2em",
                              padding: "0.2em",
                            }}
                          >
                            {name}
                          </span>
                        </p>
                      );
                    })}
                  </TimeCard>
                );
              });
            }}
          </Await>
        </Suspense>
      </MonthGrid>
    </>
  );
}

Month.loader = loader;
