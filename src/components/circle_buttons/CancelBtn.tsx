import CircleButton from "./CircleButton.jsx";
import { ReactComponent as CancelIcon } from "../../assets/icons/close_ring.svg";
import { DefaultTheme, useTheme } from "styled-components";
import { ThemeObj } from "../../styledUtils.js";

export default function CancelBtn() {
  const theme = useTheme() as ThemeObj;

  return (
    <CircleButton
      icon={CancelIcon}
      backgroundColor={theme.colors.accents.red[500]}
      stroke={true}
      fill={false}
    />
  );
}
