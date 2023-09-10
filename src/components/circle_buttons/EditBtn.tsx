import CircleButton from "./CircleButton.jsx";
import { ReactComponent as EditIcon } from "../../assets/icons/edit_icon.svg";
import { useTheme } from "styled-components";
import { ThemeObj } from "../../styledUtils.js";

export default function EditBtn() {
  const theme = useTheme() as ThemeObj;

  return (
    <CircleButton
      icon={EditIcon}
      backgroundColor={theme.colors.accents.yellow[500]}
      stroke={false}
    />
  );
}
