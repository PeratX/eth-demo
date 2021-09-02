import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../../logo.svg'

import Nav from './components/Nav'
import {Button} from "@material-ui/core";
import {useWallet} from "use-wallet";

const TopBar: React.FC = () => {
  const {connect, account} = useWallet();

  return (
    <StyledTopBar>
      <Container size="lg">
        <StyledTopBarInner>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <img src={Logo} width={"72px"}/>
            <StyledText href="#">Hurricane</StyledText>
          </div>
          <Nav />
          <div style={{
            flex: 2,
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            {account ? <StyledText>{account.toString().substr(0, 8) + "..."}</StyledText>:
            <Button variant={"contained"} onClick={() => connect("injected")}>Connect Wallet</Button>}
          </div>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}

const StyledText = styled.a`
padding-left: 10px;
font-family: PT Mono;
font-style: normal;
font-weight: bold;
letter-spacing: 2px;
font-size: 1.2rem;
color: #44F1A6;
cursor: pointer;
text-decoration: none;
`

const StyledTopBar = styled.div`
width: 100%;
background-color: #161616;
z-index: 10;
box-shadow: 0px 1px 0px rgba(28, 28, 37, 0.1);
`

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${props => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${props => props.theme.siteWidth}px;
  width: 100%;
  flex-wrap: wrap;
`

export default TopBar
