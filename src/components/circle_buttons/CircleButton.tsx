import React, { ReactComponentElement } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search_fill.svg";

interface StyledCircleButtonProps {
  size: string;
  backgroundColor: string;
}

interface StyledIconProps {
  fill: string;
  stroke: string;
  size: string;
  iconWidth: string;
}

interface CircleButtonProps extends StyledIconProps, StyledCircleButtonProps {
  iconColor: string;
  icon?: React.FC;
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
const StyledText = styled.p``;

export default function CircleButton(props: CircleButtonProps) {
  const { icon, size, backgroundColor, iconColor, iconWidth, fill, stroke } =
    props;
  return (
    <StyledCircleButton as={icon} size={size} backgroundColor={backgroundColor}>
      {icon ? (
        <StyledIcon
          fill={fill ? iconColor : "none"}
          stroke={stroke ? iconColor : "none"}
          iconWidth={iconWidth}
          size={size}
        />
      ) : (
        <StyledText>{props.text}</StyledText>
      )}
    </StyledCircleButton>
  );
}

CircleButton.defaultProps = {
  icon: SearchIcon,
  size: "48px",
  backgroundColor: "gray",
  iconColor: "white",
  fill: true,
  stroke: true,
};
