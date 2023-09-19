import React from "react";
import IconInput from "./IconInput";
import styled from "styled-components";
import { ReactComponent as CalendarIcon } from "../../../assets/icons/calendar_icon.svg";

const StyledDateInput = styled(IconInput)`
  font-family: "Inter", sans-serif;
  color: ${({ theme }) => theme.colors.neutrals[400]};
`;

export default function DateInput() {
  return (
    <StyledDateInput
      type="date"
      name="birthDate"
      onFocus='(this.type = "date")'
      iconData={{
        iconLeft: {
          icon: CalendarIcon,
          fill: true,
          stroke: true,
        },
      }}
    />
  );
}
