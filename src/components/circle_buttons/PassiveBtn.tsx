import CircleButton from "./CircleButton.jsx";
import { ReactComponent as PassiveIcon } from "../../assets/icons/passive_icon.svg";
import { useTheme } from "styled-components";
import { ThemeObj } from "../../styledUtils.js";

export default function PassiveBtn() {
  const theme = useTheme() as ThemeObj;

  return (
    <CircleButton
      icon={PassiveIcon}
      iconWidth={"20px"}
      backgroundColor={theme.colors.accents.red[500]}
    />
  );
}
