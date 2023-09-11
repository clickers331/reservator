import styled from "styled-components";
import type { ThemeObj } from "../../styledUtils";

interface ContainerNavProps {
  backgroundColor?: string;
  children: JSX.Element[];
}

const StyledContainerNav = styled.nav<{
  $backgroundcolor: string;
  theme: ThemeObj;
}>`
  transition: all 0.2s ease-in-out;
  background: ${({ $backgroundcolor }) => $backgroundcolor};
  box-sizing: border-box;
  padding: 1em 2em;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 2px solid ${({ theme: { colors } }) => colors.neutrals[300]};
  width: 100%;
  * {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: ${({
      theme: {
        colors: { neutrals },
      },
      $backgroundcolor,
    }) => ($backgroundcolor == "#fff" ? neutrals[500] : neutrals[200])};
  }
  a.active {
    color: ${({
      theme: {
        colors: { neutrals },
      },
      $backgroundcolor,
    }) => ($backgroundcolor == "#fff" ? neutrals[900] : neutrals[100])};
    font-weight: 600;
  }
`;
export default function ContainerNav({
  backgroundColor = "#fff",
  children,
}: ContainerNavProps) {
  return (
    <StyledContainerNav $backgroundcolor={backgroundColor}>
      {children}
    </StyledContainerNav>
  );
}
