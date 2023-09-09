import React, { ReactComponentElement } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search_fill.svg";

interface StyledCircleButtonProps {
  size?: string;
  backgroundColor?: string;
}

interface StyledIconProps {
  fill?: string | boolean;
  stroke?: string | boolean;
  size?: string;
  iconWidth?: string;
}

interface CircleButtonProps extends StyledIconProps, StyledCircleButtonProps {
  iconColor?: string;
  icon: React.FC;
  text?: string;
}

const StyledCircleButton = styled.button<StyledCircleButtonProps>`
  aspect-ratio: 1;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  font-size: ${({ size }) => size};
  padding: 0.25em;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${({ backgroundColor }) => backgroundColor};
`;
const StyledIcon = styled.div<StyledIconProps>`
  width: ${({ iconWidth, size }) => iconWidth || size};
  height: ${({ iconWidth, size }) => iconWidth || size};
`;

export default function CircleButton({
  icon = SearchIcon,
  size = "48px",
  backgroundColor = "gray",
  iconColor = "white",
  fill = true,
  stroke = true,
  iconWidth,
  text,
}: CircleButtonProps) {
  return (
    <StyledCircleButton size={size} backgroundColor={backgroundColor}>
      <StyledIcon
        as={icon}
        fill={fill ? iconColor : "none"}
        stroke={stroke ? iconColor : "none"}
        iconWidth={iconWidth}
        size={size}
      />
    </StyledCircleButton>
  );
}
