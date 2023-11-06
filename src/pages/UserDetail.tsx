import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { StyledProps } from "../styledUtils";
import Container from "../containers/Container";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseObjects";
import { activateUser, addClass, getAllRendezvousUser } from "../api";
import UserRendezvous from "../components/UserRendezvous";
import { ReduxState } from "../redux/rootReducer";
import { Form, Formik } from "formik";
import NumberInput from "../components/form/inputs/NumberInput";
import AddBtn from "../components/buttons/circle_buttons/AddBtn";

const DetailsGrid = styled.div`
  display: grid;
  grid-template:
    "c pi" 1fr
    "h pi" 1fr;
  align-items: center;
  justify-items: center;
  gap: 1em;
`;

const DetailLabel = styled.span`
  font-weight: bold;
`;

const DetailCategory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: space-between;
  font-size: 1.5rem;
  width: 100%;
  height: 100%;
`;

const DetailHeader = styled.h3`
  font-size: 1.2em;
  font-weight: 500;
`;

const DetailContainer = styled.div<StyledProps>`
  font-size: 1rem;
  box-sizing: border-box;
  width: 100%;
  border-radius: 2em;
  background-color: ${({ theme }) => theme.colors.primaries[900]};
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  align-items: stretch;
  justify-content: center;
  color: white;
  text-align: left;
`;

const ActivateButton = styled.button<any>`
  font-size: 1.2rem;
  border: none;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.accents.yellow[100] : theme.colors.primaries[400]};
  color: white;
  padding: 0.5em 1em;
  border-radius: 0.3em;
  cursor: pointer;
  transition: ${({ theme }) => theme.animations.transition};
  &:disabled {
    color: #bbbbbb;
    background-color: gray;
  }
`;

const Flex = styled.div<any>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ $jc }) => $jc || "flex-start"};
  gap: 1em;
`;

export default function UserDetail() {
  const { uid } = useParams() as any;
  getAllRendezvousUser(uid);
  const userData = useSelector(
    (state: ReduxState) => state.users.allUsers[uid]
  ) as any;

  const birthDate = new Date(userData.birthDate * 1000);
  const birthDateString = `${birthDate.getDate()}/${
    birthDate.getMonth() + 1
  }/${birthDate.getFullYear()}`;
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Container.Content>
          <button onClick={() => navigate(-1)}>Back</button>
          <div>
            <Flex $jc={"space-between"}>
              <h1>Detaylar</h1>
              <ActivateButton
                onClick={(e) => {
                  e.target.disabled = true;
                  activateUser(uid).then(() => {
                    e.target.disabled = false;
                  });
                }}
              >
                {userData.active ? "Pasifleştir" : "Aktifleştir"}
              </ActivateButton>
            </Flex>
            <DetailsGrid>
              <DetailCategory style={{ gridArea: "pi" }}>
                <DetailHeader>Kişisel Bilgiler</DetailHeader>
                <DetailContainer>
                  <p>
                    <DetailLabel>Tam İsim:</DetailLabel>{" "}
                    {userData.fullName || "Belirtilmemiş"}
                  </p>
                  <p>
                    <DetailLabel>Doğum Yeri:</DetailLabel>{" "}
                    {userData.birthPlace || "Belirtilmemiş"}
                  </p>
                  <p>
                    <DetailLabel>Doğum Tarihi:</DetailLabel>{" "}
                    {birthDateString || "Belirtilmemiş"}
                  </p>
                </DetailContainer>
              </DetailCategory>
              <DetailCategory style={{ gridArea: "c" }}>
                <DetailHeader>İletişim</DetailHeader>
                <DetailContainer>
                  <p>
                    <DetailLabel>Email:</DetailLabel>{" "}
                    {userData.email || "Belirtilmemiş"}
                  </p>
                  <p>
                    <DetailLabel>Telefon No.:</DetailLabel>{" "}
                    {userData.phone || "Belirtilmemiş"}
                  </p>
                </DetailContainer>
              </DetailCategory>
              <DetailCategory style={{ gridArea: "h" }}>
                <DetailHeader>Sağlık</DetailHeader>
                <DetailContainer>
                  <p>
                    <DetailLabel>Kan Gurubu:</DetailLabel>{" "}
                    {userData.bloodType || "Belirtilmemiş"}
                  </p>
                </DetailContainer>
              </DetailCategory>
            </DetailsGrid>
          </div>
          <div>
            <h1>Ders Ekle</h1>
            <h3>Ders Sayısı: {userData.lessonCount}</h3>
            <Formik
              initialValues={{
                classAmount: 0,
              }}
              onSubmit={(values, { resetForm, setSubmitting }) => {
                setSubmitting(true);
                addClass(uid, values.classAmount).then(() => {
                  setSubmitting(false);
                });
                resetForm();
              }}
            >
              {(props) => (
                <Form>
                  <Flex>
                    <NumberInput name="classAmount" placeholder={"10"} />
                    <AddBtn disabled={props.isSubmitting} />
                  </Flex>
                </Form>
              )}
            </Formik>
          </div>
          <div>
            <h1>Randevular</h1>
            <UserRendezvous />
          </div>
        </Container.Content>
      </Container>
    </>
  );
}
