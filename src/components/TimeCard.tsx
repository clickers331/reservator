import { nanoid } from "nanoid";
import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { StyledProps } from "../styledUtils";

interface StyledTimeCardProps extends StyledProps {
  $startIndex?: number;
  $dayView?: boolean;
  square?: boolean;
}

const StyledTimeCard = styled(Link)<StyledTimeCardProps>`
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
  grid-column-start: ${({ $startIndex }) => {
    if (!$startIndex) return "span(1)";
    if ($startIndex === 0) return 7;
    return $startIndex;
  }};
  ${({ $dayView }) => $dayView && `pointer-events:none;`}
  gap: 0.5em;
  ${({ square }) => (square ? "aspect-ratio:1;" : "")}
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const StyledTimeCardItem = styled.div<StyledProps>`
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5em;
  width: 100%;
  text-align: center;
  background-color: ${({ theme, $cancelled }) =>
    $cancelled ? theme.colors.primaries[800] : theme.colors.accents.red[500]};
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
`;

const StyledDateNumber = styled.div`
  font-size: 1rem;
`;

const StyledMoreInfo = styled.p<StyledProps>`
  font-size: 1rem;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.neutrals[700]};
`;

function getRenderedComponents(
  children: JSX.Element | JSX.Element[] | undefined,
  shorten: boolean | undefined,
  dayOfMonth: number
) {
  if (!children) return <StyledTimeCardItem>Randevu Yok</StyledTimeCardItem>;
  else if (Array.isArray(children)) {
    if (shorten && children.length > 5) {
      const items = [<StyledDateNumber>{children[0]}</StyledDateNumber>];
      for (let i = 0; i < 5; i++) {
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
    return children.map((child: JSX.Element, idx: number) => {
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

interface TimeCardProps {
  children: JSX.Element | JSX.Element[];
  path?: string;
  startIndex?: number;
  dayOfMonth: number;
  shorten?: boolean;
  dayView?: boolean;
}

export default function TimeCard({
  children,
  path,
  startIndex,
  dayOfMonth,
  shorten,
  dayView,
}: TimeCardProps) {
  const components = getRenderedComponents(children, shorten, dayOfMonth);
  return (
    <StyledTimeCard
      to={`../day/${path}`}
      key={nanoid()}
      $startIndex={startIndex}
      $dayView={dayView}
    >
      <StyledDateNumber>{dayOfMonth}</StyledDateNumber>
      {components}
    </StyledTimeCard>
  );
}
