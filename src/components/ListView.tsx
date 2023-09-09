import React, { Suspense } from "react";
import styled from "styled-components";
import { getAllRendezvous } from "../api";
import { monthNamesTR } from "../utils";
import { defer, useLoaderData, Await } from "react-router-dom";
import { TableContainer } from "../components/commonComponents.js";
import SearchNav from "../components/navs/SearchNav.jsx";
import GuideRow from "../components/GuideRow.jsx";
import TableRow from "../components/TableRow.jsx";

import ActiveBtn from "../components/circle_buttons/ActiveBtn.jsx";
import CancelBtn from "./circle_buttons/CancelBtn";
import InfoBtn from "./circle_buttons/InfoBtn";

const CircleButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
async function loader() {
  return defer({ rendezvous: getAllRendezvous() });
}

export default function ListView() {
  const { rendezvous } = useLoaderData();
  return (
    <>
      <SearchNav />

      <TableContainer>
        <GuideRow>
          <p>İsim</p>
          <p>Tarih</p>
          <p>Saat</p>
          <p>Durum</p>
          <p>İşlemler</p>
        </GuideRow>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Await
            resolve={rendezvous}
            errorElement={<div>Could not load users 😬</div>}
          >
            {(rendezvous) => {
              return rendezvous["2023"][0]
                .reverse()
                .slice(0, 9)
                .map(({ cancelled, date, name, uid }, idx) => {
                  const currentDate = new Date(date);
                  return (
                    <TableRow
                      rowstate={!cancelled ? "" : "cancelled"}
                      key={idx}
                    >
                      <p>{name}</p>
                      <p>
                        {currentDate.getDate()}{" "}
                        {monthNamesTR[currentDate.getMonth()]}{" "}
                        {currentDate.getFullYear()}
                      </p>
                      <p>
                        {currentDate.getHours()}:00 -{" "}
                        {currentDate.getHours() + 1}:00
                      </p>
                      <p>{!cancelled ? "Onaylı" : "İptal"}</p>
                      <CircleButtonContainer>
                        {cancelled || <CancelBtn />}
                        <InfoBtn />
                      </CircleButtonContainer>
                    </TableRow>
                  );
                });
            }}
          </Await>
        </Suspense>
      </TableContainer>
    </>
  );
}

ListView.loader = loader;
