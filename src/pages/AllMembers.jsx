import React, { Suspense } from "react";
import styled, { useTheme } from "styled-components";
import { getAllUsersWithDetails } from "../api.js";
import { defer, useLoaderData, Await } from "react-router-dom";
import { Container, TableContainer } from "../components/commonComponents.js";
import SearchNav from "../components/SearchNav.jsx";
import GuideRow from "../components/GuideRow.jsx";
import TableRow from "../components/TableRow.jsx";

import EditBtn from "../components/circle_buttons/EditBtn.jsx";
import ActiveBtn from "../components/circle_buttons/ActiveBtn.jsx";
import PassiveBtn from "../components/circle_buttons/PassiveBtn.jsx";

const CircleButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
async function loader() {
  return defer({ users: getAllUsersWithDetails() });
}

export default function AllMembers() {
  const { users } = useLoaderData();
  return (
    <Container>
      <SearchNav />

      <TableContainer>
        <GuideRow>
          <p>İsim</p>
          <p itemwidth="50%">E-Posta</p>
          <p>Durum</p>
          <p>İşlemler</p>
        </GuideRow>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Await
            resolve={users}
            errorElement={<div>Could not load users 😬</div>}
          >
            {(users) => {
              return users.map(
                ({ isActive, email, personalData: { name, surname } }) => {
                  return (
                    <TableRow debug={true} rowstate={isActive ? "" : "passive"}>
                      <p>
                        {name} {surname}
                      </p>
                      <p itemwidth="50%">{email}</p>
                      <p>{isActive ? "Aktif" : "Pasif"}</p>
                      <CircleButtonContainer>
                        {isActive ? <PassiveBtn /> : <ActiveBtn />}
                        <EditBtn />
                      </CircleButtonContainer>
                    </TableRow>
                  );
                }
              );
            }}
          </Await>
        </Suspense>
      </TableContainer>
    </Container>
  );
}

AllMembers.loader = loader;
