import styled from "styled-components";

const StyledContainer = styled.div`
  overflow: ${({ $overflow }) => $overflow || "hidden"};
  height: ${({ $height }) => $height || "700px"};
  margin: 3em 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 30px;
  border: 5px solid ${({ theme }) => theme.colors.primaries[600]};
  width: 90%;
  max-width: ${({ $maxWidth }: any) => $maxWidth || "1700px"};
  @media (max-width: ${({ theme }) => theme.screenSizes.tablet}) {
    width: 95%;
    border-size: 1px !important;
  }
`;

const ContainerContent = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1em;
  overflow-x: hidden;

  @media screen and (max-width: ${({ theme }) => theme.screenSizes.tablet}) {
    padding: 0.5em;
  }
`;

interface ContainerProps {
  children: any;
  maxWidth?: string;
  height?: string;
  overflow?: string;
}

export default function Container({
  children,
  height,
  overflow,
}: ContainerProps) {
  return (
    <StyledContainer $height={height} $overflow={overflow}>
      {children}
    </StyledContainer>
  );
}

Container.Content = ContainerContent;
