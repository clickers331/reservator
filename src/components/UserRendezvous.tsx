import styled from "styled-components";
import TableContainer from "./tables/TableContainer";
import TableRow from "./tables/TableRow";
import { monthNamesTR } from "../utils";
import CancelBtn from "./buttons/circle_buttons/CancelBtn";
import { useSelector } from "react-redux";
import { cancelRendezvous } from "../api";
import { ReduxState } from "../redux/rootReducer";

const CircleButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default function UserRendezvous() {
  //Declare the "name" prop
  const userRendezvous = useSelector(
    (state: ReduxState) => state.rendezvous.userDetailRendezvousArr
  );
  return (
    <>
      <TableContainer>
        {userRendezvous.length <= 0 ? (
          <h2>Randevu Yok</h2>
        ) : (
          userRendezvous.map((rend, idx) => {
            const { name, date, cancelled, id } = rend;
            const currentDate = new Date(date * 1000);
            return (
              <TableRow
                rowState={!cancelled ? "active" : "cancelled"}
                key={idx}
              >
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
                      clickHandler={async (e) => {
                        const err = await cancelRendezvous(id);
                        if (err) console.log(err.error);
                      }}
                    />
                  )}
                </CircleButtonContainer>
              </TableRow>
            );
          })
        )}
      </TableContainer>
    </>
  );
}
