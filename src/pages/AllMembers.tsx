import { Suspense } from "react";
import TableContainer from "../components/tables/TableContainer.js";
import Container from "../containers/Container.js";
import SearchNav from "../components/navs/SearchNav.jsx";
import TableRow from "../components/tables/TableRow.js";
import { useSelector } from "react-redux";
import { ReduxState } from "../redux/rootReducer.js";
import { nanoid } from "nanoid";

async function loader() {
  return null;
}

//Load 10 users at the end of every scroll

export default function AllMembers() {
  const usersData = useSelector((state: ReduxState) => state.users.allUsers);
  return (
    <>
      <h1>Üyeler</h1>
      <Container>
        <SearchNav />
        <Container.Content $padding={"1rem"}>
          <TableContainer>
            <Suspense fallback={<h1>Loading...</h1>}>
              {Object.values(usersData).map((user: any) => {
                const { active, email, fullName, uid } = user;

                return (
                  <TableRow
                    key={nanoid()}
                    to={`/admin/users/${uid}`}
                    debug={true}
                    state={active ? "active" : "passive"}
                  >
                    <p>{fullName}</p>
                    <p className="extra-info">{email}</p>
                    <p className="extra-info">{active ? "Aktif" : "Pasif"}</p>
                  </TableRow>
                );
              })}
            </Suspense>
          </TableContainer>
        </Container.Content>
      </Container>
    </>
  );
}

AllMembers.loader = loader;
