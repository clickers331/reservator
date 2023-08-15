import React from "react";
import { TableRow, TableItemContainer } from "./commonComponents";
import { nanoid } from "nanoid";

export default function GuideRow({ children }) {
  console.log(children);
  return (
    <TableRow type="guide">
      {children.map((child) => (
        <TableItemContainer key={nanoid()}>{child}</TableItemContainer>
      ))}
    </TableRow>
  );
}
