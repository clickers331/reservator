import { Suspense } from "react";
import styled, { useTheme } from "styled-components";
import TimeCard from "../TimeCard";
import Error from "../Error";
import WeekRow from "../WeekRow";
import { defer, Await, useLoaderData, NavLink } from "react-router-dom";
import { Rendezvous, Rendezvous2D } from "../../api";
import { nanoid } from "nanoid";
import { DateParams } from "./paramsInterfaces";
import { StyledProps, ThemeObj } from "../../styledUtils";
import MonthNav from "../navs/MonthNav";

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

const HourText = styled.span<StyledProps>`
  width: 30%;
  text-align: right;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutrals[200]};
  font-size: 1em;
  padding: 0.2em;
`;

const NameText = styled.span<StyledProps>`
  width: 70%;
  text-align: left;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutrals[100]};
  font-size: 1.2em;
  padding: 0.2em;
`;

async function loader({ params: { year, month } }: DateParams) {
  return defer({
    rendezvousData: [],
    dates: { year, month },
  });
}

export default function Month() {
  const { rendezvousData, dates } = useLoaderData() as {
    rendezvousData: Rendezvous2D;
    dates: { year: string; month: string };
  };
  const theme = useTheme() as ThemeObj;
  return (
    <>
      <MonthNav />
      <WeekRow />
      <MonthGrid>
        <Suspense fallback={<h1>Takvim Yükleniyor...</h1>}>
          <Await resolve={rendezvousData} errorElement={<Error />}>
            {(rendezvousData: Rendezvous2D) => {
              if (rendezvousData.length == 0)
                return <h1>Bu ay hiçbir randevu yok</h1>;
              return rendezvousData.map(
                (data: Rendezvous[] | [], idx: number) => {
                  const currentDate = new Date(
                    new Date(+dates.year, +dates.month - 1, idx + 1)
                  );
                  const currentWeekDay = currentDate.getDay();
                  const currentMonthDay = currentDate.getDate();
                  if (data.length == 0)
                    return (
                      <TimeCard
                        key={nanoid()}
                        startIndex={currentWeekDay}
                        dayOfMonth={currentMonthDay}
                      >
                        <p>Bugün kürekçi yok</p>
                      </TimeCard>
                    );
                  return (
                    <TimeCard
                      key={nanoid()}
                      path={`${currentDate.getFullYear()}/${
                        currentDate.getMonth() + 1
                      }/${currentMonthDay}`}
                      dayOfMonth={currentMonthDay}
                      startIndex={currentWeekDay}
                      shorten
                    >
                      {...data.map(({ name, date }) => {
                        return (
                          <p key={nanoid()}>
                            <HourText>{new Date(date).getHours()}:00</HourText>
                            <NameText
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
                            </NameText>
                          </p>
                        );
                      })}
                    </TimeCard>
                  );
                }
              );
            }}
          </Await>
        </Suspense>
      </MonthGrid>
    </>
  );
}

Month.loader = loader;
