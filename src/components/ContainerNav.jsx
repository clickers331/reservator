import React from "react";
import styled from "styled-components";

const StyledContainerNav = styled.nav`
  background: ${({ backgroundcolor }) => backgroundcolor};
  box-sizing: border-box;
  padding: 1em 2em;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 5px solid ${({ theme }) => theme.colors.neutrals[300]};
  width: 100%;
  * {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: ${({
      theme: {
        colors: { neutrals },
      },
      backgroundColor,
    }) => (backgroundColor == !"white" ? neutrals[200] : neutrals[600])};
  }
  a.active {
    color: ${({
      theme: {
        colors: { neutrals },
      },
      backgroundColor,
    }) => (backgroundColor == !"white" ? neutrals[100] : neutrals[900])};
  }
`;
export default function ContainerNav({ backgroundColor, children }) {
  return (
    <StyledContainerNav backgroundcolor={backgroundColor}>
      {children}
    </StyledContainerNav>
  );
}
