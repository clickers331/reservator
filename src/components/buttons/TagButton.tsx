import React from "react";
import styled from "styled-components";

const StyledTagButton = styled.button`
  padding: 1em;
  background-color: ${({ theme }) => theme.colors.neutrals[700]};
  color: ${({ theme }) => theme.colors.neutrals[100]};
  border-radius: 10px;
  padding: 0.5em 1em;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

export default function TagButton({ children }: any) {
  return <StyledTagButton>{...children}</StyledTagButton>;
}
