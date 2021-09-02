import React from 'react';
import './App.css';
import {createTheme, MuiThemeProvider} from "@material-ui/core";
import {UseWalletProvider} from "use-wallet";
import Home from "./Home";
import {ThemeProvider} from "styled-components";

const muiTheme = createTheme({
  typography: {
    fontFamily: "PT Mono"
  },
  palette: {
    primary: {
      light: '#44F1A6',
      main: '#44F1A6',
      dark: '#44F1A6'
    },
    secondary: {
      main: '#1F1F1F'
    },
    background: {
      default: '#1F1F1F',
      paper: '#1F1F1F'
    },
    type: 'dark'
  }
})

const Providers: React.FC = ({children}) => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={{
        siteWidth: 1200,
        spacing: {
          1: 4,
          2: 8,
          3: 16,
          4: 24,
          5: 32,
          6: 48,
          7: 64,
        },
        topBarSize: 72
      }}>
      <UseWalletProvider chainId={3} connectors={{
        walletconnect: {
          rpcUrl: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
        }
      }}>
        {children}
      </UseWalletProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

const App: React.FC = ({children}) => {
  return (
    <Providers>
      <Home/>
    </Providers>
  )
}

export default App;
