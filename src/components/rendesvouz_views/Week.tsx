import { Suspense } from "react";
import styled, { useTheme } from "styled-components";
import TimeCard from "../TimeCard";
import WeekRow from "../WeekRow";
import { defer, Await, Link, useLoaderData, useParams } from "react-router-dom";
import { ErrorObject, Rendezvous2D } from "../../api";
import { nanoid } from "nanoid";
import { WeekParams } from "./paramsInterfaces";
import { StyledProps } from "../../styledUtils";

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
async function loader({ params: { weekNo } }: WeekParams) {
  return defer({ weekData: [] });
}

export default function Week() {
  let { weekNo } = useParams() as WeekParams["params"];
  weekNo = weekNo || 0;
  const { weekData } = useLoaderData() as {
    weekData: Rendezvous2D | ErrorObject;
  };
  const theme = useTheme();

  return (
    <>
      <WeekRow />
      <StyledWeekView>
        <CarouselArrow to={`../week/${parseInt(weekNo.toString()) - 1}`}>
          {`<`}
        </CarouselArrow>
        <StyledWeekGrid>
          <Suspense fallback={<h1>loding</h1>}>
            <Await resolve={weekData}>
              {(weekData: Rendezvous2D | ErrorObject) => {
                if ("error" in weekData) return <h1>{weekData.error}</h1>;
                if (weekData.length == 0)
                  return <h1>Bu ay hiçbir randevu yok</h1>;
                return weekData.map((data, idx) => {
                  if (data.length == 0)
                    return (
                      <TimeCard key={nanoid()} dayOfMonth={idx + 1}>
                        <p>{idx + 1}</p>
                        <p>Bugün kürekçi yok</p>
                      </TimeCard>
                    );
                  const currentDate = new Date(data[0].date);
                  const currentMonthDay = currentDate.getDate();
                  return (
                    <TimeCard
                      key={nanoid()}
                      path={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentMonthDay}`}
                      dayOfMonth={currentMonthDay}
                      shorten
                    >
                      {...data.map(({ name, date }) => {
                        return (
                          <p key={nanoid()}>
                            <HourText>{new Date(date).getHours()}:00</HourText>
                            <NameText>{name}</NameText>
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
        <CarouselArrow to={`../week/${parseInt(weekNo.toString()) + 1}`}>
          {">"}
        </CarouselArrow>
      </StyledWeekView>
    </>
  );
}

Week.loader = loader;
