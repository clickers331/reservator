import React from "react";
import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const ErrorMessage = styled.h2`
  color: ${({ theme }) => theme.colors.accents.red[500]};
`;

export default function Error() {
  const error = useRouteError();
  return <ErrorMessage>{error.message}</ErrorMessage>;
}
