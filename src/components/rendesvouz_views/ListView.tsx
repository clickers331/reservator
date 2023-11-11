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
import Container from "../../containers/Container";
import { useSelector } from "react-redux";
import { ReduxState } from "../../redux/rootReducer";

const CircleButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
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
      <TableContainer>
        {allRendezvous.map(({ cancelled, date, name, id }, idx) => {
          const currentDate = new Date(date * 1000);
          return (
            <TableRow state={!cancelled ? "active" : "cancelled"} key={idx}>
              <p>{name}</p>
              <p className="extra-info">
                {currentDate.getDate()} {monthNamesTR[currentDate.getMonth()]}{" "}
                {currentDate.getFullYear()}
              </p>
              <p>
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
    </>
  );
}

ListView.loader = loader;
