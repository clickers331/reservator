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
            const { date, cancelled } = rend;
            const currentDate = new Date(date * 1000);
            return (
              <TableRow state={!cancelled ? "active" : "cancelled"} key={idx}>
                <p>
                  {currentDate.getDate()} {monthNamesTR[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </p>
                <p>
                  {currentDate.getHours()}:00 - {currentDate.getHours() + 1}:00
                </p>
                <p className="extra-info">
                  {!cancelled ? "Confirmed" : "Cancelled"}
                </p>
                <CircleButtonContainer>
                  {cancelled || (
                    <CancelBtn
                      clickHandler={async (e: any) => {
                        e.target.disabled = true;
                        cancelRendezvous(rend).then(
                          () => (e.target.disabled = false)
                        );
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
