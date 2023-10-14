import { Suspense } from "react";
import styled from "styled-components";
import {
  cancelRendezvous,
  getAllRendezvous,
  getAllRendezvousFB,
} from "../../api";
import { monthNamesTR } from "../../utils";
import { defer, useLoaderData, Await } from "react-router-dom";
import TableContainer from "../tables/TableContainer";
import SearchNav from "../navs/SearchNav.js";
import GuideRow from "../tables/GuideRow.js";
import TableRow from "../tables/TableRow.js";
import CancelBtn from "../buttons/circle_buttons/CancelBtn";
import InfoBtn from "../buttons/circle_buttons/InfoBtn";
import { type AllRandezvous } from "../../data/mockDatabase";
import Container from "../Container";
import { useSelector } from "react-redux";
import { ReduxState } from "../../redux/rootReducer";

const CircleButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
async function loader() {
  getAllRendezvousFB();
  return null;
}

export default function ListView() {
  const allRendezvous = useSelector(
    (state: ReduxState) => state.rendezvous.rendezvousArr
  );
  return (
    <>
      <SearchNav />
      <Container.Content>
        <TableContainer>
          {allRendezvous.map(({ cancelled, date, name, id }, idx) => {
            const currentDate = new Date(date * 1000);
            return (
              <TableRow
                rowState={!cancelled ? "active" : "cancelled"}
                key={idx}
              >
                <p>{name}</p>
                <p>
                  {currentDate.getDate()} {monthNamesTR[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </p>
                <p>
                  {currentDate.getHours()}:00 - {currentDate.getHours() + 1}:00
                </p>
                <p>{!cancelled ? "Onaylı" : "İptal"}</p>
                <CircleButtonContainer>
                  {cancelled || (
                    <CancelBtn
                      clickHandler={() => {
                        cancelRendezvous(id);
                      }}
                    />
                  )}
                </CircleButtonContainer>
              </TableRow>
            );
          })}
        </TableContainer>
      </Container.Content>
    </>
  );
}

ListView.loader = loader;
