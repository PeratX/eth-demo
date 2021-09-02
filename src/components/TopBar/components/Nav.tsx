import React, {useState} from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink>Home</StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
font-family: PT Mono;
font-style: normal;
font-weight: bold;
font-size: 16px;
text-transform: capitalize;
  cursor: pointer;
  color: #FFFFFF;
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: #44F1A6;
  }
  &.active {
    color: #44F1A6;
  }
`
export default Nav
