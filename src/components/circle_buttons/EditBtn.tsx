import React from "react";
import CircleButton from "./CircleButton.jsx";
import { ReactComponent as EditIcon } from "../../assets/icons/edit_icon.svg";
import { useTheme } from "styled-components";

export default function EditBtn() {
  const theme = useTheme();

  return (
    <CircleButton
      icon={EditIcon}
      backgroundColor={theme.colors.accents.yellow[500]}
      stroke={false}
    />
  );
}
