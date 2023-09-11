import styled from "styled-components";
import { nanoid } from "nanoid";
import { StyledProps } from "../styledUtils";

interface TableRowProps {
  children: JSX.Element[];
  rowState?: "cancelled" | "passive" | "active";
  debug?: boolean;
}

interface TableRowContainerProps {
  $rowState?: "cancelled" | "passive" | "active";
}

const TableItemContainer = styled.div<{ children: JSX.Element }>`
  min-width: fit-content;
  ${({
    children: {
      props: { itemwidth },
    },
  }) => {
    return itemwidth && `width:${itemwidth} !important`;
  }}
`;

const StyledTableRow = styled.div<
  TableRowContainerProps & StyledProps & { children: JSX.Element[] }
>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  width: 100%;
  border-radius: 15px;
  background-color: ${({ $rowState, theme }) => {
    switch ($rowState) {
      case "cancelled":
        return theme.colors.accents.red[300];
      case "passive":
        return theme.colors.accents.yellow[300];
      default:
        return theme.colors.primaries[300];
    }
  }};
  color: ${({ theme }) => {
    return theme.colors.neutrals[900];
  }};
  font-size: 1rem;
  font-weight: 700;
  & > ${TableItemContainer} {
    width: ${({ children }) => 100 / children.length}%;
  }
`;

export default function TableRow({ children, rowState }: TableRowProps) {
  return (
    <StyledTableRow $rowState={rowState}>
      {children.map((child) => {
        return <TableItemContainer key={nanoid()}>{child}</TableItemContainer>;
      })}
    </StyledTableRow>
  );
}

export { StyledTableRow, TableItemContainer };
