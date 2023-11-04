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
import { ReactComponent as CalendarIcon } from "../assets/icons/calendar_icon.svg";
import SelectInput from "../components/form/inputs/SelectInput";
import { ReactComponent as TimeIcon } from "../assets/icons/time.svg";
import AddBtn from "../components/buttons/circle_buttons/AddBtn";
import { dayNamesTR } from "../utils";

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
  const today = new Date(Date.now());
  const todayPlusOne = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 10
  );
  const todayPlusTwo = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 2
  );
  const todayPlusThree = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 3
  );

  return (
    <Container maxWidth="1400px">
      <Container.Content>
        <h1>Randevu Al</h1>
        <StyledLessonCountText>
          Kalan Ders Sayısı: {user.lessonCount}
        </StyledLessonCountText>
        <Formik
          initialValues={{
            date: today,
            hour: "7",
          }}
          onSubmit={(values) => {
            if (parseInt(user.lessonCount as string) > 0) {
              console.log(values);

              const valueDate = new Date(values.date);
              const newDate = new Date(
                valueDate.getFullYear(),
                valueDate.getMonth(),
                valueDate.getDate(),
                parseInt(values.hour)
              );
              console.log(newDate);
              addRendezvous(newDate);
            }
          }}
        >
          <Form>
            <InputRow>
              <SelectInput
                name="date"
                placeholder=""
                iconData={{
                  iconLeft: {
                    icon: CalendarIcon,
                    fill: true,
                    stroke: true,
                  },
                }}
              >
                <option
                  value={`${today.getFullYear()}-${today.getMonth() + 1}-${
                    today.getDate() + 1
                  }`}
                >
                  {dayNamesTR[today.getDay()]}
                </option>
                <option
                  value={`${today.getFullYear()}-${today.getMonth() + 1}-${
                    today.getDate() + 2
                  }`}
                >
                  {
                    dayNamesTR[
                      today.getDay() + 1 > 6
                        ? today.getDay() - 6
                        : today.getDay() + 1
                    ]
                  }
                </option>
                <option
                  value={`${today.getFullYear()}-${today.getMonth() + 1}-${
                    today.getDate() + 3
                  }`}
                >
                  {
                    dayNamesTR[
                      today.getDay() + 2 > 6
                        ? today.getDay() - 5
                        : today.getDay() + 2
                    ]
                  }
                </option>
              </SelectInput>
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
