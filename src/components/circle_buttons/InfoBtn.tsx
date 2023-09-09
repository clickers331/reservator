import React from "react";
import CircleButton from "./CircleButton.jsx";
import { ReactComponent as InfoIcon } from "../../assets/icons/info_icon.svg";
import { useTheme } from "styled-components";

export default function InfoBtn() {
  const theme = useTheme();

  return (
    <CircleButton
      icon={InfoBtn}
      backgroundColor={theme.colors.accents.blue[500]}
      stroke={false}
    />
  );
}
