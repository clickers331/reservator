import React, { Suspense } from "react";
import styled from "styled-components";
import { getAllUsersWithDetails } from "../api.js";
import { defer, useLoaderData, Await } from "react-router-dom";
import { Container, TableContainer } from "../components/commonComponents";
import SearchNav from "../components/SearchNav";
import GuideRow from "../components/GuideRow";
import TableRow from "../components/TableRow";

export async function loader() {
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
                    <TableRow type={isActive ? false : "yellow"}>
                      <p>
                        {name} {surname}
                      </p>
                      <p itemwidth="50%">{email}</p>
                      <p>{isActive ? "Aktif" : "Pasif"}</p>
                      <p>İşlemler</p>
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
