import React, { Suspense } from "react";
import styled, { useTheme } from "styled-components";
import { getAllUsersWithDetails } from "../api.js";
import { defer, useLoaderData, Await } from "react-router-dom";
import { Container, TableContainer } from "../components/commonComponents";
import SearchNav from "../components/SearchNav";
import GuideRow from "../components/GuideRow";
import TableRow from "../components/TableRow";
import CircleButton from "../components/CircleButton";
import { ReactComponent as CloseIcon } from "../assets/icons/close_ring.svg";
import { ReactComponent as EditIcon } from "../assets/icons/edit_pen.svg";

const CircleButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;
export async function loader() {
  return defer({ users: getAllUsersWithDetails() });
}

export default function AllMembers() {
  const { users } = useLoaderData();
  const theme = useTheme();
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
                        <CircleButton
                          text="P"
                          iconColor={"white"}
                          backgroundColor={theme.colors.accents.red[500]}
                          fill={false}
                        />
                        <CircleButton
                          icon={EditIcon}
                          iconColor={"white"}
                          backgroundColor={theme.colors.accents.yellow[500]}
                          stroke={false}
                        />
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
