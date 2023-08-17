import React from "react";
import CircleButton from "./CircleButton.jsx";
import { ReactComponent as ActiveIcon } from "../../assets/icons/active_icon.svg";
import { useTheme } from "styled-components";

export default function ActiveBtn() {
  const theme = useTheme();

  return (
    <CircleButton
      icon={ActiveIcon}
      iconWidth={"20px"}
      backgroundColor={theme.colors.primaries[300]}
    />
  );
}
