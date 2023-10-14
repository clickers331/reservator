import styled from "styled-components";
import { Suspense } from "react";
import { defer, useLoaderData, Await, useParams } from "react-router-dom";
import { getAllRendezvousDay } from "../../api";
import { monthNamesTR } from "../../utils";
import { DateParams } from "./paramsInterfaces";
import { StyledProps } from "../../styledUtils";
import { type FormattedDay } from "../../api";
import { Rendezvous } from "../../data/mockDatabase";

async function loader({ params: { month, day } }: DateParams) {
  return defer({ dayData: getAllRendezvousDay("2023", month, day) });
}

const StyledDay = styled.div<StyledProps>`
  background-color: ${({ theme }) => theme.colors.neutrals[500]};
  text-align: center;
  padding: 2em;
  width: 90%;
  max-width: 600px;
  margin: 1em auto;
  border-radius: 30px;
  color: ${({ theme }) => theme.colors.neutrals[100]};
`;

const StyledHourHeader = styled.h2<StyledProps>`
  font-size: 2rem;
`;

const StyledDateHeader = styled.h2<StyledProps>`
  color: ${({ theme }) => theme.colors.neutrals[200]};
  font-size: 1.4rem;
`;

const StyledRendezvousItem = styled.p<StyledProps>`
  background-color: ${({ theme }) => theme.colors.primaries[800]};
  font-size: 1.4rem;
  padding: 0.5em;
  border-radius: 10px;
  margin: 0;
`;

const StyledRendezvousItemContainer = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
`;

const CancelDayBtn = styled.button``;

type DayDataKeyValue = [string, Rendezvous[]];

export default function Day() {
  const { dayData } = useLoaderData() as { dayData: FormattedDay };
  const { month, day } = (useParams() as DateParams["params"])!;
  const turkishMonthName = monthNamesTR[+month - 1];
  return (
    <Suspense fallback={<h1>Yukleniveriveriyor</h1>}>
      <Await resolve={dayData}>
        {(dayData: FormattedDay) => {
          return (
            <StyledDay>
              <StyledDateHeader>
                {day} {turkishMonthName}
              </StyledDateHeader>
              <CancelDayBtn> Günü İptal Et</CancelDayBtn>
              {!dayData ? (
                <h1>Bugün randevu yok</h1>
              ) : (
                Object.entries(dayData).map(
                  ([hour, rendezvousArr]: DayDataKeyValue) => {
                    return (
                      <div>
                        <StyledHourHeader>{hour}:00</StyledHourHeader>
                        <StyledRendezvousItemContainer>
                          {rendezvousArr.map((rendezvous: Rendezvous) => (
                            <StyledRendezvousItem>
                              {rendezvous.name}
                            </StyledRendezvousItem>
                          ))}
                        </StyledRendezvousItemContainer>
                      </div>
                    );
                  }
                )
              )}
            </StyledDay>
          );
        }}
      </Await>
    </Suspense>
  );
}

Day.loader = loader;
