import { Suspense } from "react";
import styled from "styled-components";
import { cancelRendezvous, getAllRendezvous } from "../../api";
import { monthNamesTR } from "../../utils";
import { defer, useLoaderData, Await } from "react-router-dom";
import TableContainer from "../tables/TableContainer";
import SearchNav from "../navs/SearchNav.js";
import GuideRow from "../tables/GuideRow.js";
import TableRow from "../tables/TableRow.js";
import CancelBtn from "../buttons/circle_buttons/CancelBtn";
import InfoBtn from "../buttons/circle_buttons/InfoBtn";
import { type AllRandezvous } from "../../data/mockDatabase";
import Container from "../../containers/Container";
import { useSelector } from "react-redux";
import { ReduxState } from "../../redux/rootReducer";

const CircleButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;
async function loader() {
  getAllRendezvous();
  return null;
}

export default function ListView() {
  const allRendezvous = useSelector(
    (state: ReduxState) => state.rendezvous.rendezvousArr
  );
  return (
    <Container.Content $padding="1rem">
      <TableContainer>
        {allRendezvous.map(({ cancelled, date, name, id }, idx) => {
          const currentDate = new Date(date * 1000);
          return (
            <TableRow state={!cancelled ? "active" : "cancelled"} key={idx}>
              <p>{name}</p>
              <p>
                {currentDate.getDate()} {monthNamesTR[currentDate.getMonth()]}{" "}
                {currentDate.getFullYear()}
              </p>
              <p className="extra-info">
                {currentDate.getHours()}:00 - {currentDate.getHours() + 1}:00
              </p>
              <p className="extra-info">{!cancelled ? "Onaylı" : "İptal"}</p>
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
  );
}

ListView.loader = loader;
