import { nanoid } from "nanoid";
import React from "react";
import { styled } from "styled-components";

const StyledTimeCard = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primaries[600]};
  padding: 0.5em;
  box-sizing: border-box;

  ${({ square }) => square || `aspect-ratio:1;`}
`;

const StyledTimeCardItem = styled.div`
  border-radius: 5px;
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primaries[400]};
`;
export default function TimeCard({ children, square }) {
  if (!children) {
    return <StyledTimeCard empty="true" />;
  }
  console.log(children);
  return (
    <StyledTimeCard square={square}>
      {!Array.isArray(children) ? (
        <StyledTimeCardItem key={nanoid()}>{children}</StyledTimeCardItem>
      ) : (
        children?.map((child) => (
          <StyledTimeCardItem key={nanoid()}>{child}</StyledTimeCardItem>
        ))
      )}
    </StyledTimeCard>
  );
}
