import React from "react";
import styled from "styled-components";

export default function ContainerNav({ backgroundColor, children }) {
  const StyledContainerNav = styled.nav`
    background: ${backgroundColor};
    box-sizing: border-box;
    padding: 1em 2em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 5px solid ${({ theme }) => theme.colors.neutrals[300]};
    width: 100%;
    * {
      margin: 0;
    }
    a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.neutrals[200]};
    }
    a.active {
      color: ${({ theme }) => theme.colors.neutrals[100]};
    }
  `;

  return <StyledContainerNav>{children}</StyledContainerNav>;
}
