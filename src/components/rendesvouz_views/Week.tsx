import React, { Suspense, useState } from "react";
import styled, { useTheme } from "styled-components";
import TimeCard from "../TimeCard";
import WeekRow from "../WeekRow";
import { defer, Await, Link, useLoaderData, useParams } from "react-router-dom";
import { getAllRendezvousWeek } from "../../api";
import { nanoid } from "nanoid";

const StyledWeekView = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  height: 100%;
`;

const StyledWeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5em;
  padding: 2em 0.4em;
  justify-content: stretch;
  align-items: stretch;
  width: 100%;
  & > * {
    width: 100%;
    text-align: center;
  }
`;

const CarouselArrow = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.neutrals[100]};
  background-color: ${({ theme }) => theme.colors.primaries[600]};
`;

async function loader({ params: { weekNo } }) {
  console.log("kakak");
  return defer({ weekData: getAllRendezvousWeek("2023", weekNo) });
}

export default function Week() {
  let { weekNo } = useParams();
  weekNo = weekNo || 0;
  const { weekData } = useLoaderData();
  const theme = useTheme();

  return (
    <>
      <WeekRow />
      <StyledWeekView>
        <CarouselArrow to={`../week/${parseInt(weekNo) - 1}`}>
          {" "}
          {`<`}{" "}
        </CarouselArrow>
        <StyledWeekGrid>
          <Suspense fallback={<h1>loding</h1>}>
            <Await resolve={weekData}>
              {(weekData) => {
                if (weekData.length == 0)
                  return <h1>Bu ay hiçbir randevu yok</h1>;
                if (weekData.error) return <h1>{weekData.error}</h1>;
                return weekData.map((data, idx) => {
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
                      <p>{currentMonthDay}</p>
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
        </StyledWeekGrid>
        <CarouselArrow to={`../week/${parseInt(weekNo) + 1}`}>
          {">"}
        </CarouselArrow>
      </StyledWeekView>
    </>
  );
}

Week.loader = loader;
