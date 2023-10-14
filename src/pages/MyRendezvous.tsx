import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import {
  addRendezvous,
  decreaseLessonAmount,
  getAllRendezvousFB,
  getAllRendezvousUser,
} from "../api";
import UserRendezvous from "../components/UserRendezvous";
import Container from "../components/Container";
import { Formik, Field, Form } from "formik";
import { ReduxState } from "../redux/rootReducer";
import styled, { useTheme } from "styled-components";
import DateInput from "../components/form/inputs/DateInput";
import SelectInput from "../components/form/inputs/SelectInput";
import { ReactComponent as TimeIcon } from "../assets/icons/time.svg";
import AddBtn from "../components/buttons/circle_buttons/AddBtn";

const StyledLessonCountText = styled.p`
  font-size: 1.5rem;
`;
const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

async function loader() {
  getAllRendezvousUser();
  return null;
}

export default function MyRendezvous() {
  const user = useSelector((state: ReduxState) => state.user);

  return (
    <Container maxWidth="1400px">
      <Container.Content>
        <h1>Randevu Al</h1>
        <StyledLessonCountText>
          Kalan Ders Sayısı: {user.lessonCount}
        </StyledLessonCountText>
        <Formik
          initialValues={{
            date: new Date(Date.now()),
            hour: "7",
          }}
          onSubmit={(values) => {
            console.log(values);
            console.log("eysluye");
            const valueDate = new Date(values.date);
            const newDate = new Date(
              valueDate.getFullYear(),
              valueDate.getMonth(),
              valueDate.getDate(),
              parseInt(values.hour)
            );
            addRendezvous(newDate);
          }}
        >
          <Form>
            <InputRow>
              <DateInput name="date" />
              <SelectInput
                name="hour"
                placeholder=""
                iconData={{
                  iconLeft: {
                    icon: TimeIcon,
                    stroke: true,
                    fill: false,
                  },
                }}
              >
                <option value="5">5:00</option>
                <option value="6">6:00</option>
                <option value="7">7:00</option>
                <option value="8">8:00</option>
              </SelectInput>
              <AddBtn />
            </InputRow>
          </Form>
        </Formik>
        <h1>Randevularım</h1>
        <UserRendezvous />
      </Container.Content>
    </Container>
  );
}

MyRendezvous.loader = loader;