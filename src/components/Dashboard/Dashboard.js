import '../../App.css';
import {Fragment, useState} from 'react'
import PortfolioSummary from '../../components/PortfolioSummary/PortfolioSummary';
import Header from '../../components/layout/Header';
import OrderHistory from '../../components/OrderHistory/OrderHistory';
import CartProvider from '../../components/store/CartProvider';
import OrderForm from '../../components/OrderForm/OrderForm';
import LatestQuotes from '../../components/LatestQuote/LatestQuotes';


function Dashboard() {
  const [cartIsShown,setCartIsShown] = useState(false)

  const showCartHandler = () => {
    setCartIsShown(true)
  }
  const hideCartHandler =() => {
    setCartIsShown(false)
  }

  return (
    <CartProvider>
      {cartIsShown && <OrderHistory onClose ={hideCartHandler}/>}
      <Header onShowCart ={showCartHandler}/>
      <main>
        <PortfolioSummary/>
        <LatestQuotes/>
      </main>
    </CartProvider>
  );
}
export default Dashboard;
