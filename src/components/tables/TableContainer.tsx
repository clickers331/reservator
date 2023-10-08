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
`;

export default function TableContainer({ children }: { children: any }) {
  return <StyledTableContainer>{children}</StyledTableContainer>;
}
