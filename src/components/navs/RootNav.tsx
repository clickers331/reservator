import styled from "styled-components";

const Nav = styled.nav`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaries[400]};
  color: #fff;
  padding: 3em;
  margin: 0;
  width: 100%;
  height: ${({ theme }) => theme.sizes.navHeight};
  a {
    color: ${({ theme }) => theme.colors.neutrals[200]};
    text-decoration: none;
    font-weight: 600;
    transition: ${({ theme }) => theme.animations.transition};
  }
  a:hover {
    color: #fff;
  }
  a.active {
    color: ${({ theme }) => theme.colors.neutrals[100]};
    font-weight: 900;
  }
`;

const StyledHeader = styled.h1`
  color: ${({ theme }) => theme.colors.neutrals[100]};
  font-weight: 900;
`;

const LightText = styled.span`
  font-weight: 200;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
`;

const OutletContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 50px);
  width: 100%;
  margin: 0;
  padding: 0;
`;
export default function RootNav({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  return <Nav>{children}</Nav>;
}

RootNav.Header = StyledHeader;
RootNav.LightText = LightText;
RootNav.LinkContainer = LinkContainer;
RootNav.OutletContainer = OutletContainer;
