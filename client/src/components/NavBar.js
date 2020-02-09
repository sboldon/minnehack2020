import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import { LocalHospitalRounded, InfoRounded, SettingsRounded } from '@material-ui/icons';

export default function NavBar() {

  return (
    <BottomTabBar>
      <NavContainer>
        <NavList>
          <li>
            <StyledNavLink to="/" exact>
              <StyledIcon className="emergency">
                <LocalHospitalRounded/>
              </StyledIcon>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/information" exact>
              <StyledIcon className="icon">
                <InfoRounded/>
              </StyledIcon>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/settings" exact>
              <StyledIcon className="icon">
                <SettingsRounded/>
              </StyledIcon>
            </StyledNavLink>
          </li>
        </NavList>
      </NavContainer>
    </BottomTabBar>
  );
}

const MaterialIcon = ({children, className}) => (
  <IconButton>
  {React.cloneElement(children, { className })}
  </IconButton>
)

const CustomLink = ({className, to, children}) => (
  <NavLink activeClassName="active" className={className} to={to}>{children}</NavLink>
)


const BottomTabBar = styled.header`
  z-index: 99;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(70, 70, 70, 1),
    rgb(37, 37, 37, 1)
  );
  box-shadow: 0px 1px 3px #bcbcbd;
  height: 7.5vh;
`

const NavContainer = styled.nav`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`

const NavList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

const StyledIcon = styled(MaterialIcon)`
  &.icon, &.emergency {
    margin: auto;
    color: #989898;
    display: block;
    height: 32px;
    width: 32px;
  }
`

const StyledNavLink = styled(CustomLink)`
  font-size: 0.75em;
  color: white;
  margin: 0px 75px;
  padding-bottom: 1.8vh;
  border-radius: 3px;

  &.active {
    border-bottom: 4px solid #61A5E5;
  }
`
