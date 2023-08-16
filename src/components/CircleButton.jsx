import React from "react";
import styled, { useTheme } from "styled-components";
import { ReactComponent as SearchIcon } from "../assets/icons/search_fill.svg";

const StyledCircleButton = styled.button`
  aspect-ratio: 1;
  font-size: ${({ size }) => size};
  padding: 0.25em;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.4em;
  cursor: pointer;
  background: ${({ color }) => color};
`;

const StyledCircleButtonIcon = styled.img`
  aspect-ratio: 1;
  color: black;
`;

export default function CircleButton({
  icon,
  text,
  size,
  backgroundColor,
  iconColor,
  fill,
  stroke,
}) {
  const StyledIcon = styled(icon)`
    width: ${size};
    height: ${size};
  `;

  const StyledText = styled.p`
    font-size: ${size};
  `;

  console.log(backgroundColor);
  return (
    <StyledCircleButton size={size} color={backgroundColor}>
      {icon ? (
        <StyledIcon
          fill={iconColor}
          stroke={iconColor}
          fillOpacity={fill ? 1 : 0}
          strokeOpacity={stroke ? 1 : 0}
        />
      ) : (
        <StyledText>{text}</StyledText>
      )}
    </StyledCircleButton>
  );
}

CircleButton.defaultProps = {
  icon: SearchIcon,
  size: "32px",
  backgroundColor: "gray",
  iconColor: "black",
  fill: true,
  stroke: true,
  text: "T",
};
