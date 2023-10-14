import { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import { getPaginatedUsers } from "../api.js";
import { defer, useLoaderData, Await } from "react-router-dom";
import TableContainer from "../components/tables/TableContainer.js";
import Container from "../components/Container.js";
import SearchNav from "../components/navs/SearchNav.jsx";
import GuideRow from "../components/tables/GuideRow.js";
import TableRow from "../components/tables/TableRow.js";

import EditBtn from "../components/buttons/circle_buttons/EditBtn.js";
import ActiveBtn from "../components/buttons/circle_buttons/ActiveBtn.js";
import PassiveBtn from "../components/buttons/circle_buttons/PassiveBtn.js";
import { UserDetail, User } from "../data/mockDatabase.js";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { ReduxState } from "../redux/rootReducer.js";
import { nanoid } from "nanoid";

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
  const usersData = useSelector((state: ReduxState) => state.users.allUsers);
  useEffect(() => {
    if (inView) {
      if (usersData[0]) {
        getPaginatedUsers(usersData[(usersData.length as any) - 1]);
      } else {
        getPaginatedUsers();
      }
    }
  }, [inView]);
  return (
    <>
      <h1>Üyeler</h1>
      <Container>
        <SearchNav />
        <Container.Content>
          <TableContainer>
            <Suspense fallback={<h1>Loading...</h1>}>
              {Object.values(usersData).map((user: any) => {
                const { active, email, fullName, uid } = user;

                return (
                  <TableRow
                    key={nanoid()}
                    to={`/admin/users/${uid}`}
                    debug={true}
                    rowState={active ? "active" : "passive"}
                  >
                    <p>{fullName}</p>
                    <p>{email}</p>
                    <p>{active ? "Aktif" : "Pasif"}</p>
                  </TableRow>
                );
              })}
            </Suspense>
          </TableContainer>
          <div ref={ref}>MORE STUFF</div>
        </Container.Content>
      </Container>
    </>
  );
}

AllMembers.loader = loader;
