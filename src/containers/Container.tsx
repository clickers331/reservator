import styled from "styled-components";

const StyledContainer = styled.div`
  overflow: hidden;
  margin: 3em 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 30px;
  border: 5px solid ${({ theme }) => theme.colors.primaries[600]};
  width: 90%;
  max-width: ${({ $maxWidth }: any) => $maxWidth || "1700px"};
  min-height: 50vh;
`;

const ContainerContent = styled.div`
  height: 100%;
  padding: 2em;
`;

interface ContainerProps {
  children: any;
  maxWidth?: string;
}

export default function Container({ children, maxWidth }: ContainerProps) {
  return <StyledContainer>{children}</StyledContainer>;
}

Container.Content = ContainerContent;
