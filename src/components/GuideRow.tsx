import React from "react";
import { StyledTableRow, TableItemContainer } from "./TableRow";
import { nanoid } from "nanoid";
import styled from "styled-components";

const StyledGuideRow = styled(StyledTableRow)`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.neutrals[200]};
  background: ${({ theme }) => theme.colors.neutrals[700]};
`;

export default function GuideRow({ children }: { children: JSX.Element[] }) {
  return (
    <StyledGuideRow>
      {children?.map((child) => (
        <TableItemContainer key={nanoid()}>{child}</TableItemContainer>
      ))}
    </StyledGuideRow>
  );
}
