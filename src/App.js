import logo from './logo.svg';
import './App.css';
import {Fragment, useState} from 'react'
import PortfolioSummary from './components/PortfolioSummary/PortfolioSummary';
import Header from './components/layout/Header';
import OrderHistory from './components/OrderHistory/OrderHistory';

function App() {
  const [cartIsShown,setCartIsShown] = useState(false)

  const showCartHandler = () => {
    setCartIsShown(true)
  }
  const hideCartHandler =() => {
    setCartIsShown(false)
  }
  // !discuss calos onShowCart and onClose
  return (
    <Fragment>
      {cartIsShown && <OrderHistory onClose ={hideCartHandler}/>}
      <Header onShowCart ={showCartHandler}/>
      <main>
        <PortfolioSummary/>
      </main>
    </Fragment>

    
  );
}

export default App;
