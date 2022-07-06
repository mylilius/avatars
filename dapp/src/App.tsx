import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import { AppContainer } from './Application';
import { Web3ReactProvider } from '@web3-react/core';
import Web3Connectors from './utils/web3_connectors';
import * as Component from './components';
import * as Page from './pages';
function App() {
  return (
    <AppContainer>
      <Web3ReactProvider connectors={Web3Connectors}>        
        <Router>
          <Component.Navigation />
          <Routes>
            <Route path='/' element={<Page.HomePage /> } />
            <Route path='/creator' element={<Page.CreatorPage /> } />
            <Route path='/myavatar' element={<Page.MyAvatarPage /> } />
          </Routes>
        </Router>
      </Web3ReactProvider>
      <Component.Footer />
    </AppContainer>
  );
}

export default App;
