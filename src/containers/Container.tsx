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

interface ContainerContentProps {
  props: {
    $overflowX: string;
    $overflowY: string;
    $padding: string;
  };
}

const ContainerContent = styled.div<StyledProps | ContainerContentProps>`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: ${({ $overflowX }) => $overflowX || "scroll"};
  overflow-y: ${({ $overflowY }) => $overflowY || "scroll"};
  padding: ${({ $padding }) => $padding || "0"};
`;

interface ContainerProps {
  children: any;
  maxWidth?: string;
  height?: string;
  overflowX?: string;
  overflowY?: string;
  padding?: string;
}

export default function Container({
  children,
  height,
  overflowX,
  overflowY,
  padding,
}: ContainerProps) {
  return <StyledContainer $height={height}>{children}</StyledContainer>;
}

Container.Content = ContainerContent;
