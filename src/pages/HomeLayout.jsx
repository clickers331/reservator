import React from "react";
import styled from "styled-components";
import { NavLink, Link, Outlet } from "react-router-dom";
//Build me a simple nav bar with styled compenents

const Nav = styled.nav`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaries[400]};
  color: #fff;
  padding: 3em;
  margin: 0;
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

const BodyContainer = styled.div`
  min-height: 100vh;
`;

const OutletContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 50px);
  width: 100%;
  background: ${({ theme }) => theme.colors.neutrals[100]};
  margin: 0;
  padding: 0;
`;

export default function HomeLayout() {
  return (
    <BodyContainer>
      <Nav>
        <StyledHeader>
          BKK <LightText>Randevu</LightText>
        </StyledHeader>
        <LinkContainer>
          <NavLink to="/">ev</NavLink>
          <NavLink to="/randevular">tüm randevular</NavLink>
          <NavLink to="/uyeler">üyeler</NavLink>
        </LinkContainer>
        <LinkContainer>
          <Link to="/">çıkış</Link>
        </LinkContainer>
      </Nav>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </BodyContainer>
  );
}
