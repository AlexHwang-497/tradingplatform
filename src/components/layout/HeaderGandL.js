import { useContext } from 'react';

import classes from './HeaderGandL.Module.css'
import CartIcon from './CartIcon'
import CartContext from '../store/CartContext';


// ! this is the equivalen of HeaderCartButton.js

const HeaderGainLoss = (props) => {
  const cartCtx = useContext(CartContext)
  console.log(cartCtx.items)
// *this will count the number of items we have in our cart or it put it at  0 no items
  const numberOfCartItems = cartCtx.items.reduce((curNumber,item)=> {
    return curNumber + item.amount
  },0)
  
  return (
    <button className={classes.button} onClick ={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}
export default HeaderGainLoss