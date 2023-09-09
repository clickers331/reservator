import React from "react";
import CircleButton from "./CircleButton.jsx";
import { ReactComponent as CancelIcon } from "../../assets/icons/close_ring.svg";
import { DefaultTheme, useTheme } from "styled-components";
import styled from "styled-components";

export default function CancelBtn() {
  const theme: DefaultTheme = useTheme();

  return (
    <CircleButton
      icon={CancelIcon}
      backgroundColor={theme.colors.accents.red[500]}
      stroke={true}
      fill={false}
    />
  );
}
