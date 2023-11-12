import styled from "styled-components";
import { Suspense } from "react";
import { defer, useLoaderData, Await, useParams } from "react-router-dom";
import {
  cancelDayFB,
  cancelRendezvous,
  getAllRendezvousDay,
  getRendezvousDayFB,
} from "../../api";
import { monthNamesTR } from "../../utils";
import { DateParams } from "./paramsInterfaces";
import { StyledProps } from "../../styledUtils";
import { type FormattedDay } from "../../api";
import { Rendezvous } from "../../data/mockDatabase";
import OriginalCancelBtn from "../buttons/circle_buttons/CancelBtn";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { ReduxState } from "../../redux/rootReducer";

const StyledDay = styled.div<StyledProps>`
  margin: auto;
  justify-content: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1em;
  background-color: ${({ theme }) => theme.colors.neutrals[500]};
  text-align: center;
  padding: 2em;
  width: 90%;
  max-width: 600px;
  border-radius: 30px;
  color: ${({ theme }) => theme.colors.neutrals[100]};
  @media (max-width: ${({ theme }) => theme.screenSizes.tablet}) {
    height: 100%;
    width: 100%;
    border-radius: 0;
  }
`;

const StyledHourHeader = styled.h2<StyledProps>`
  font-size: 2rem;
`;

const StyledDateHeader = styled.h2<StyledProps>`
  color: ${({ theme }) => theme.colors.neutrals[200]};
  font-size: 1.4rem;
`;

const StyledRendezvousItem = styled.p<StyledProps>`
  background-color: ${({ theme, $cancelled }) =>
    !$cancelled ? theme.colors.primaries[800] : theme.colors.accents.red[900]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  padding: 0.5em 1em;
  border-radius: 10px;
  margin: 0;
`;

const StyledRendezvousItemContainer = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
`;

const CancelBtn = styled(OriginalCancelBtn)`
  background-color: white !important;
  font-size: 10px !important;
`;

const CancelDayBtn = styled.button`
  color: white;
  background-color: ${({ theme }) => theme.colors.accents.red[900]};
  border: solid ${({ theme }) => theme.colors.accents.red[700]} 5px;
  font-size: 1.2rem;
  padding: 1em 2em;
  border-radius: 1em;
  cursor: pointer;
  transition: ${({ theme }) => theme.animations.transition};
  &:disabled {
    background: gray;
    border-color: #a8a8a8;
  }
`;

type DayDataKeyValue = [string, Rendezvous[]];

async function loader({ params: { month, day } }: DateParams) {
  await getRendezvousDayFB(`2023-${month}-${day}`);
  return null;
}

export default function Day() {
  const { month, day } = (useParams() as DateParams["params"])!;
  const dayRendezvous = useSelector(
    (state: ReduxState) => state.rendezvous.dayRendezvous
  );
  console.log(dayRendezvous);
  const turkishMonthName = monthNamesTR[+month - 1];
  return (
    <StyledDay>
      <StyledDateHeader>
        {day} {turkishMonthName}
      </StyledDateHeader>
      {!dayRendezvous ? (
        <h1>Bugün randevu yok</h1>
      ) : (
        Object.entries(dayRendezvous).map(
          ([hour, rendezvousArr]: DayDataKeyValue) => {
            return (
              <div key={nanoid()}>
                <StyledHourHeader>{hour}:00</StyledHourHeader>
                <StyledRendezvousItemContainer>
                  {rendezvousArr.map((rendezvous: Rendezvous) => (
                    <StyledRendezvousItem
                      key={nanoid()}
                      $cancelled={rendezvous.cancelled}
                    >
                      {rendezvous.name}
                      {rendezvous.cancelled || (
                        <CancelBtn
                          clickHandler={async (e: any) => {
                            e.target.disabled = true;
                            cancelRendezvous(rendezvous.id).then(
                              () => (e.target.disabled = false)
                            );
                          }}
                        />
                      )}
                    </StyledRendezvousItem>
                  ))}
                </StyledRendezvousItemContainer>
              </div>
            );
          }
        )
      )}
      <CancelDayBtn
        onClick={(e) => {
          console.log("clicked!");
          e.target.disabled = true;
          cancelDayFB("").then(() => (e.target.disabled = false));
        }}
      >
        Günü İptal Et
      </CancelDayBtn>
    </StyledDay>
  );
}

Day.loader = loader;
