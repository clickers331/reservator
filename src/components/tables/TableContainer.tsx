import React from "react";
import styled from "styled-components";

const StyledTableContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 1em;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  padding: 1em 3em;
  @media screen and (max-width: ${({ theme }) => theme.screenSizes.tablet}) {
    padding: 1em;
  }
`;

export default function TableContainer({ children }: { children: any }) {
  return <StyledTableContainer>{children}</StyledTableContainer>;
}
