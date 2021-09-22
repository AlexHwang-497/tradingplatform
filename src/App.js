import logo from './logo.svg';
import './App.css';
import {Fragment} from 'react'
import PortfolioSummary from './components/PortfolioSummary/PortfolioSummary';
import Header from './components/layout/Header';

function App() {
  return (
    <Fragment>
      <Header/>
      <main>
        <PortfolioSummary/>
      </main>
      

    </Fragment>

    
  );
}

export default App;
