import { nanoid } from "nanoid";
import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const StyledTimeCard = styled(Link)`
  text-decoration: none;
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  color: white;
  width: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.neutrals[500]};
  padding: 0.7em;
  box-sizing: border-box;
  grid-column-start: ${({ startindex }) => {
    if (startindex === 0) return 7;
    return startindex;
  }};
  ${({ dayview }) => dayview && `pointer-events:none;`}
  gap: 0.5em;
  ${({ square }) => square || `aspect-ratio:1;`}
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const StyledTimeCardItem = styled.div`
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5em;
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primaries[800]};
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
`;

const StyledDateNumber = styled.div`
  font-size: 1rem;
`;

const StyledMoreInfo = styled.p`
  font-size: 1rem;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.neutrals[700]};
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
        <StyledMoreInfo key={nanoid()}>
          {children.length - 4} tane daha
        </StyledMoreInfo>,
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
  path,
  startIndex: startindex,
  shorten,
  dayView: dayview,
}) {
  const components = getRenderedComponents(children, shorten);
  return (
    <StyledTimeCard
      to={`../day/${path}`}
      key={nanoid()}
      startindex={startindex}
      dayview={dayview}
    >
      {components}
    </StyledTimeCard>
  );
}

//{!Array.isArray(children) ? (
//<StyledTimeCardItem key={nanoid()}>{children}</StyledTimeCardItem>
//) : (
//children?.map((child) => (
//<StyledTimeCardItem key={nanoid()}>{child}</StyledTimeCardItem>
//))
//)}
