import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as HamburgerIcon } from "../../assets/icons/menu.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/close_round.svg";

const Nav = styled.nav`
  position: relative;
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
  width: 1fr;
  color: ${({ theme }) => theme.colors.neutrals[100]};
  font-weight: 900;
`;

const LightText = styled.span`
  font-weight: 200;
`;

const SecondaryText = styled.span`
  font-family: "IBM Plex Mono";
  font-weight: 500;
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

const AllLinksContainer = styled.div<{ $open: boolean }>`
  display: flex;
  gap: 1em;
  @media screen and (max-width: ${({ theme }) => theme.screenSizes.tablet}) {
    transition: ${({ theme }) => theme.animations.transition};
    transition-duration: 500ms;
    position: fixed;
    top: 0;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    gap: 0.7em;
    width: 80vw;
    right: 0;
    background-color: ${({ theme }) => theme.colors.primaries[500]};
    transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(100%)")};
  }
`;

const Seperator = styled.span`
  font-weight: 400;
  font-size: 1.5rem;
`;

const HamburgerCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 1em;
  right: 1em;
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  stroke: white;
  cursor: pointer;
  @media screen and (min-width: ${({ theme }) => theme.screenSizes.tablet}) {
    display: none;
  }
`;

const HamburgerOpenIcon = styled(HamburgerIcon)`
  top: 1em;
  right: 1em;
  width: 3rem;
  height: 3rem;
  stroke: white;
  cursor: pointer;
  @media screen and (min-width: ${({ theme }) => theme.screenSizes.tablet}) {
    display: none;
  }
`;

export default function RootNav({
  children,
  admin,
}: {
  children: JSX.Element[] | JSX.Element;
  admin: boolean;
}) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  return (
    <Nav>
      <StyledHeader>
        BKK <LightText>Randevu</LightText>
        {admin ? (
          <>
            <Seperator> | </Seperator>
            <SecondaryText>Admin</SecondaryText>
          </>
        ) : null}
      </StyledHeader>
      <AllLinksContainer $open={hamburgerOpen}>
        {children}
        <HamburgerCloseIcon
          onClick={(e) => {
            setHamburgerOpen(false);
          }}
        >
          X
        </HamburgerCloseIcon>
      </AllLinksContainer>
      <HamburgerOpenIcon
        onClick={(e) => {
          setHamburgerOpen(true);
        }}
      >
        open
      </HamburgerOpenIcon>
    </Nav>
  );
}

RootNav.Header = StyledHeader;
RootNav.LightText = LightText;
RootNav.OutletContainer = OutletContainer;
RootNav.SecondaryText = SecondaryText;
