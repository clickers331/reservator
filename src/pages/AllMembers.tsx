import { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import { getPaginatedUsers } from "../api.js";
import { defer, useLoaderData, Await } from "react-router-dom";
import { Container, TableContainer } from "../components/commonComponents.js";
import SearchNav from "../components/navs/SearchNav.jsx";
import GuideRow from "../components/GuideRow.jsx";
import TableRow from "../components/TableRow.jsx";

import EditBtn from "../components/circle_buttons/EditBtn.jsx";
import ActiveBtn from "../components/circle_buttons/ActiveBtn.jsx";
import PassiveBtn from "../components/circle_buttons/PassiveBtn.jsx";
import { UserDetail, User } from "../data/mockDatabase.js";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

const CircleButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
async function loader() {
  return defer({ users: "YEYEYYEYE" });
}

//Load 10 users at the end of every scroll

export default function AllMembers() {
  const { ref, inView, entry } = useInView({
    threshold: 1,
  });
  const usersData = useSelector((state) => state.users.allUsers);
  console.log(usersData);
  useEffect(() => {
    if (inView) {
      if (usersData[0]) {
        getPaginatedUsers(usersData[usersData.length - 1]);
      } else {
        getPaginatedUsers();
      }
    }
  }, [inView]);
  return (
    <Container>
      <SearchNav />

      <TableContainer>
        <GuideRow>
          <p>İsim</p>
          <p style={{ width: "50%" }}>E-Posta</p>
          <p>Durum</p>
          <p>İşlemler</p>
        </GuideRow>
        <Suspense fallback={<h1>Loading...</h1>}>
          {Object.values(usersData).map((user: any) => {
            const { active, email, fullName } = user.data();
            return (
              <TableRow
                to={`/admin/users/${user.id}`}
                debug={true}
                rowState={active ? "active" : "passive"}
              >
                <p>{fullName}</p>
                <p>{email}</p>
                <p>{active ? "Aktif" : "Pasif"}</p>
                <CircleButtonContainer>
                  <EditBtn />
                </CircleButtonContainer>
              </TableRow>
            );
          })}
        </Suspense>
      </TableContainer>
      <div ref={ref}>MORE STUFF</div>
    </Container>
  );
}

AllMembers.loader = loader;
