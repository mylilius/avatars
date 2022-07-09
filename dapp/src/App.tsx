import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import { AppContainer } from './Application';
import { Web3ReactProvider } from '@web3-react/core';
import Web3Connectors from './utils/web3_connectors';
import * as Component from './components';

import { HomePage } from './Home';
import { CreatorPage } from './Creator';
import { MyAvatarPage } from './MyAvatar';

import { useEffect } from 'react';
import { ConnectWallet } from './ConnectWallet';
import { GasStation } from './GasStation';
function App() {

  useEffect(() => {
    console.log("Connected");
  }, [])

  return (
    <AppContainer>
      <Web3ReactProvider connectors={Web3Connectors}>        
        <Router>
          <Component.Navigation />
          <Routes>
            <Route path='/' element={<HomePage /> } />
            <Route path='/creator' element={<CreatorPage /> } />
            <Route path='/myavatar' element={<MyAvatarPage /> } />
            <Route path='/connect' element={<ConnectWallet />} />
            <Route path='/gas-station' element={<GasStation />} />
          </Routes>
        </Router>
      </Web3ReactProvider>
      <Component.Footer />
    </AppContainer>
  );
}

export default App;
