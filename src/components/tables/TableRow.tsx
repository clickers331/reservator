import styled from "styled-components";
import { nanoid } from "nanoid";
import { StyledProps } from "../../styledUtils";
import { Link } from "react-router-dom";

interface TableRowProps {
  children: JSX.Element[];
  to?: string;
  state?: "cancelled" | "passive" | "active";
  debug?: boolean;
}

interface TableRowContainerProps {
  $state?: "cancelled" | "passive" | "active";
}

const TableItemContainer = styled.div<{ children: JSX.Element }>`
  min-width: fit-content;
`;

const StyledTableRow: any = styled(Link)<
  TableRowContainerProps & StyledProps & { children: JSX.Element[] }
>`
  text-decoration: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  width: 100%;
  border-radius: 15px;
  background-color: ${({ $state, theme }) => {
    switch ($state) {
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
    width: 1fr;
  }
`;

export default function TableRow(props: TableRowProps) {
  const { children, state, to } = props;
  return (
    <>
      {to ? (
        <StyledTableRow to={to} $state={state}>
          {children.map((child) => {
            return (
              <TableItemContainer key={nanoid()}>{child}</TableItemContainer>
            );
          })}
        </StyledTableRow>
      ) : (
        <StyledTableRow as="div" to="" $state={state}>
          {children.map((child) => {
            return (
              <TableItemContainer key={nanoid()}>{child}</TableItemContainer>
            );
          })}
        </StyledTableRow>
      )}
    </>
  );
}

export { StyledTableRow, TableItemContainer };
