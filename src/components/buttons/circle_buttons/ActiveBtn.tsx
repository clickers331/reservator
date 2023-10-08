import IconButton from "./IconButton.js";
import { ReactComponent as ActiveIcon } from "../../assets/icons/active_icon.svg";
import { useTheme } from "styled-components";
import { ThemeObj } from "../../../styledUtils.js";

export default function ActiveBtn() {
  const theme = useTheme() as ThemeObj;

  return (
    <IconButton
      icon={ActiveIcon}
      iconWidth={"20px"}
      backgroundColor={theme.colors.primaries[300]}
    />
  );
}
