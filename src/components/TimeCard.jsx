import { nanoid } from "nanoid";
import React from "react";
import { styled } from "styled-components";

const StyledTimeCard = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  width: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primaries[700]};
  padding: 0.7em;
  box-sizing: border-box;
  grid-column-start: ${({ startindex }) => {
    if (startindex === 0) return 7;
    return startindex;
  }};

  gap: 0.5em;
  ${({ square }) => square || `aspect-ratio:1;`}
`;

const StyledTimeCardItem = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5em;
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primaries[900]};
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
`;

const StyledDateNumber = styled.div`
  font-size: 1.4rem;
`;

const StyledMoreInfo = styled.p`
  font-size: 1rem;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.neutrals[300]};
`;

function getRenderedComponents(children, shorten) {
  if (!children) return <StyledTimeCardItem>no children</StyledTimeCardItem>;
  else if (Array.isArray(children)) {
    if (shorten && children.length > 5) {
      const items = [<StyledDateNumber>{children[0]}</StyledDateNumber>];
      for (let i = 1; i < 5; i++) {
        const child = children[i];

        items.push(
          <StyledTimeCardItem key={nanoid()}>
            {...child.props.children}
          </StyledTimeCardItem>
        );
      }
      return [
        ...items,
        <StyledMoreInfo>{children.length - 4} tane daha</StyledMoreInfo>,
        ,
      ];
    }
    return children.map((child, idx) => {
      if (idx === 0)
        return <StyledDateNumber key={nanoid()}>{child}</StyledDateNumber>;
      return (
        <StyledTimeCardItem key={nanoid()}>
          {...child.props.children}
        </StyledTimeCardItem>
      );
    });
  } else {
    return <StyledTimeCardItem key={nanoid()}>{children}</StyledTimeCardItem>;
  }
}

export default function TimeCard({
  children,
  startIndex: startindex,
  shorten,
}) {
  const components = getRenderedComponents(children, shorten);
  return <StyledTimeCard startindex={startindex}>{components}</StyledTimeCard>;
}

//{!Array.isArray(children) ? (
//<StyledTimeCardItem key={nanoid()}>{children}</StyledTimeCardItem>
//) : (
//children?.map((child) => (
//<StyledTimeCardItem key={nanoid()}>{child}</StyledTimeCardItem>
//))
//)}
