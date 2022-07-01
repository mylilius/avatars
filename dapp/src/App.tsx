import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import { AppContainer } from './Application';
import * as Component from './components';
import * as Page from './pages';
function App() {
  return (
    <AppContainer>
      <Component.Navigation />
      <Router>
        <Routes>
          <Route path='/' element={<Page.HomePage />} />
        </Routes>
      </Router>
      <Component.Footer />
    </AppContainer>
  );
}

export default App;
