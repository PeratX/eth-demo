import React, {useCallback, useEffect, useState} from "react";
import {useWallet} from "use-wallet";
import TopBar from "./components/TopBar";
import Container from "./components/Container";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import {JsonRpcProvider, StaticJsonRpcProvider, Web3Provider} from "@ethersproject/providers";
import {parseEther} from "ethers/lib/utils";

declare var web3: any;

export function getProv(): JsonRpcProvider {
  if (typeof web3 !== 'undefined' && typeof web3?.currentProvider !== 'undefined') {
    return new Web3Provider(web3.currentProvider);
  }
  return new StaticJsonRpcProvider("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", 3);
}

const Home: React.FC = () => {
  const now = () => {
    return parseInt((new Date().getTime() / 1000).toString());
  }

  const [d, setD] = useState("Loading");

  const {account, connect, error} = useWallet();
  const [whitelist, setWhitelist] = useState(false);
  const [canBuy, setCanBuy] = useState(true);
  const [targetTime, setTargetTime] = useState(now() + 10 * 60);

  const updateCountdown = useCallback(async () => {
    setD(Math.max(0, targetTime - now()).toString());
  }, [targetTime, setD]);

  useEffect(() => {
    if (error != null) {
      console.log(error)
    }
  }, [error]);

  useEffect(() => {
    const i = setInterval(updateCountdown, 500);
    return () => clearInterval(i);
  }, [targetTime])

  const isStarted = () => (targetTime - now()) <= 0;

  const buy = () => {
    if (!isStarted()) {
      alert("未到公募时间");
    } else if (!whitelist) {
      alert("您未在白名单中，请稍后参加");
    } else if (!canBuy) {
      alert("白名单公墓已达上限，请参见公共池");
    } else {
      getProv().getSigner().sendTransaction({
        chainId: 3,
        to: "0x2425B3523BA0Ba63c91F6Eb8D3fd0d76E814B7EA",
        value: parseEther("0.000001")
      }).then(r => alert("成功")).catch(e => alert("失败"));
    }
  };

  return (
    <div style={{backgroundColor: "#000000", minHeight: "1000px"}}>
      <TopBar/>
      <div style={{marginTop: "100px"}}>
        <Container size="md">
          <StyledText style={{fontSize: '4rem'}}>HurricaneSwap Token</StyledText>
          <StyledText style={{fontSize: '5rem', fontWeight: "bold"}}>IDO</StyledText>
          <StyledDiv>
            <StyledText style={{paddingRight: '20px'}}>{d}</StyledText>
            <Button variant="contained" size="small" onClick={() => setTargetTime(now())}>Countdown to 0</Button>
          </StyledDiv>
          <StyledText style={{marginTop: "50px"}}>白名单：{whitelist ? "是" : "否"}  是否上限：{canBuy ? "否" : "是"}</StyledText>
          {
            account ?
              <StyledDiv style={{marginTop: "50px"}}>
                <Button variant="contained" size="large" onClick={() => buy()}>Enter IDO</Button>
                <Button variant="contained" size="large" onClick={() => setWhitelist(true)}>Join Whitelist</Button>
                <Button variant="contained" size="large" onClick={() => setCanBuy(false)}>已达到上限</Button>
              </StyledDiv> : <></>
          }
        </Container>
      </div>
    </div>
  )
}

const StyledText = styled.div`
  color: #FFFFFF;
  font-size: 2rem;
`

const StyledDiv = styled.div`
display: flex;
`

export default Home;
