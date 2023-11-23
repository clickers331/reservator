import React from "react";
import styled, { useTheme } from "styled-components";
import { Formik, Field, Form } from "formik";
import { ReactComponent as CalendarIcon } from "../assets/icons/calendar_icon.svg";
import SelectInput from "../components/form/inputs/SelectInput";
import { ReactComponent as TimeIcon } from "../assets/icons/time.svg";
import AddBtn from "../components/buttons/circle_buttons/AddBtn";
import { dayNamesTR } from "../utils";
import { addRendezvous } from "../api";
import { useSelector } from "react-redux";
import { type ReduxState } from "../redux/rootReducer";

const StyledLessonCountText = styled.p`
  font-size: 1.5rem;
`;
const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export default function AddRendezvousForm() {
  const user = useSelector((state: ReduxState) => state.users.self);
  const today = new Date(); // get today's date
  return (
    <>
      <h1>Randevu Al</h1>
      <StyledLessonCountText>
        Kalan Ders Sayısı: {user.lessonCount}
      </StyledLessonCountText>
      <Formik
        initialValues={{
          date: today,
          hour: "7",
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (parseInt(user.lessonCount as unknown as string) > 0) {
            const valueDate = new Date(values.date);
            valueDate.setHours(parseInt(values.hour));
            addRendezvous(valueDate).then(() => setSubmitting(false));
          }
        }}
      >
        {(props) => (
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
                  value={`${new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate() + 1
                  )}
                `}
                >
                  {dayNamesTR[today.getDay()]}
                </option>
                <option
                  value={`${new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate() + 2
                  )}`}
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
                  value={`${new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate() + 3
                  )}`}
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
              <AddBtn disabled={props.isSubmitting || !user.active} />
            </InputRow>
          </Form>
        )}
      </Formik>
    </>
  );
}
