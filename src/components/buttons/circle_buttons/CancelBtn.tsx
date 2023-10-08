import IconButton from "./IconButton.js";
import { ReactComponent as CancelIcon } from "../../../assets/icons/close_ring.svg";
import { DefaultTheme, useTheme } from "styled-components";
import { ThemeObj } from "../../../styledUtils.js";
import { MouseEventHandler } from "react";

interface CancelBtnProps {
  clickHandler?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function CancelBtn(props: CancelBtnProps) {
  const theme = useTheme() as ThemeObj;
  return (
    <IconButton
      clickHandler={props.clickHandler}
      icon={CancelIcon}
      backgroundColor={theme.colors.accents.red[500]}
      stroke={true}
      fill={false}
    />
  );
}
