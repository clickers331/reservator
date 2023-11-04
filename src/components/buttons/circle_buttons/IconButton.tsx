import React, {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactComponentElement,
} from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search_fill.svg";

interface StyledIconButtonProps {
  $borderRadius: string;
  $size?: string;
  $backgroundColor?: string;
  type?: string;
}

interface StyledIconProps {
  fill?: string | boolean;
  stroke?: string | boolean;
  $size?: string;
  $iconWidth?: string;
}

interface IconButtonProps {
  size?: string;
  fill?: string | boolean;
  stroke?: string | boolean;
  iconWidth?: string;
  backgroundColor?: string;
  iconColor?: string;
  icon?: React.FC;
  text?: string;
  clickHandler?: MouseEventHandler<HTMLButtonElement> | undefined;
  type?: string;
  borderRadius?: string;
}

const StyledIconButton = styled.button<StyledIconButtonProps>`
  aspect-ratio: 1;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  font-size: ${({ $size }) => $size};
  padding: 0.25em;
  border-radius: ${({ $borderRadius }) => $borderRadius};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${({ $backgroundColor }) => $backgroundColor};
`;
const StyledIcon = styled.svg<StyledIconProps>`
  width: ${({ $iconWidth, $size }) => $iconWidth || $size};
  height: ${({ $iconWidth, $size }) => $iconWidth || $size};
`;

export default function IconButton({
  icon = SearchIcon,
  size = "48px",
  backgroundColor = "gray",
  iconColor = "white",
  fill = true,
  stroke = true,
  iconWidth,
  clickHandler = () => {},
  type = "submit",
  borderRadius = "50%",
  text,
}: IconButtonProps) {
  return (
    <StyledIconButton
      type={type}
      onClick={clickHandler}
      $size={size}
      $backgroundColor={backgroundColor}
      $borderRadius={borderRadius}
    >
      <StyledIcon
        as={icon}
        fill={fill ? iconColor : "none"}
        stroke={stroke ? iconColor : "none"}
        $iconWidth={iconWidth}
        $size={size}
      />
    </StyledIconButton>
  );
}
