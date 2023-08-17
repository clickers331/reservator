import React from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search_fill.svg";

export default function CircleButton({
  icon,
  size,
  backgroundColor,
  iconColor,
  iconWidth,
  fill,
  stroke,
}) {
  const StyledCircleButton = styled.button`
    aspect-ratio: 1;
    width: ${size};
    height: ${size};
    font-size: ${size};
    padding: 0.25em;
    border-radius: 50%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: ${backgroundColor};
  `;
  const StyledIcon = styled(icon)`
    width: ${iconWidth || size};
    height: ${iconWidth || size};
  `;

  return (
    <StyledCircleButton>
      {icon ? (
        <StyledIcon
          fill={fill ? iconColor : "none"}
          stroke={stroke ? iconColor : "none"}
        />
      ) : (
        <StyledText>{text}</StyledText>
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
