import React from "react";
import CircleButton from "./CircleButton.jsx";
import { ReactComponent as CancelIcon } from "../../assets/icons/close_ring.svg";
import { useTheme } from "styled-components";
import styled from "styled-components";

const StyledCancelBtn = styled(CircleButton)``;

export default function CancelBtn() {
  const theme = useTheme();

  return (
    <StyledCancelBtn
      icon={CancelIcon}
      backgroundColor={theme.colors.accents.red[500]}
      stroke={true}
      fill={false}
    />
  );
}
