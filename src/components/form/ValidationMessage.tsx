import React from "react";
import styled from "styled-components";
import { StyledProps } from "../../styledUtils";

interface ValidationMessageProps {
  children: string;
}

const StyledValidationMessage = styled.p<StyledProps>`
  color: white;
  background-color: ${({ theme }) => theme.colors.accents.red[500]};
  padding: 0.5em 1em;
  margin: 0;
  border-radius: 10px;
`;

export default function ValidationMessage({
  children,
}: ValidationMessageProps) {
  return <StyledValidationMessage>{children}</StyledValidationMessage>;
}
