import React from "react";
import {
  TableRow as TableRowContainer,
  TableItemContainer,
} from "./commonComponents";
import { nanoid } from "nanoid";

export default function TableRow({ children }) {
  return (
    <TableRowContainer>
      {children.map((child) => {
        return <TableItemContainer key={nanoid()}>{child}</TableItemContainer>;
      })}
    </TableRowContainer>
  );
}
