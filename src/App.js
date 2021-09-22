import logo from './logo.svg';
import './App.css';
import {Fragment} from 'react'
import PortfolioSummary from './components/PortfolioSummary/PortfolioSummary';
import Header from './components/layout/Header';
import OrderHistory from './components/OrderHistory/OrderHistory';

function App() {
  return (
    <Fragment>
      <OrderHistory/>
      <Header/>
      <main>
        <PortfolioSummary/>
      </main>
      

    </Fragment>

    
  );
}

export default App;
