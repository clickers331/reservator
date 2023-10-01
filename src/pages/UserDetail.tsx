import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { StyledProps } from "../styledUtils";
import { Container } from "../components/commonComponents";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseObjects";

const DetailLabel = styled.span`
  font-weight: bold;
`;

const DetailCategory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: space-between;
  border: red solid 1px;
`;

const DetailHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`;

const DetailContainer = styled.div<StyledProps>`
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

export default function UserDetail() {
  const { uid } = useParams();
  const userRef = useSelector((state) => state.users.allUsers[uid]);
  const userData = userRef.data();
  const [lessonCount, setLessonCount] = useState(userData.lessonCount);

  const birthDate = new Date(userData.birthDate.seconds * 1000);
  const birthDateString = `${birthDate.getDate()}/${
    birthDate.getMonth() + 1
  }/${birthDate.getFullYear()}`;

  async function clickHandler(e) {
    try {
      await updateDoc(doc(db, "users", uid), {
        lessonCount: parseInt(lessonCount),
      });
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <>
      <Container>
        <DetailCategory>
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
        <DetailCategory>
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
        <DetailCategory>
          <DetailHeader>Sağlık</DetailHeader>
          <DetailContainer>
            <p>
              <DetailLabel>Kan Gurubu:</DetailLabel>{" "}
              {userData.bloodType || "Belirtilmemiş"}
            </p>
          </DetailContainer>
        </DetailCategory>
      </Container>
    </>
  );
}
