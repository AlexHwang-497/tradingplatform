import { useContext, useEffect, useState } from 'react';

import classes from './HeaderGandL.Module.css'
import CartIcon from './CartIcon'
import CartContext from '../store/CartContext';


// ! this is the equivalen of HeaderCartButton.js

const HeaderGainLoss = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
  const cartCtx = useContext(CartContext)

  const{items} = cartCtx
  console.log('cartCtx.items:'+JSON.stringify(cartCtx.items))

  // *this will count the number of items we have in our cart or it put it at  0 no items
  const numberOfCartItems = cartCtx.items.reduce((curNumber,item)=> {
    return curNumber + item.amount
  },0)
  console.log('numberOfcartItems:'+numberOfCartItems)
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump: ''}`

  useEffect(()=> {
    if(items.length===0){
      return;
    }
    setBtnIsHighlighted(true)
    const timer = setTimeout(()=>{
      setBtnIsHighlighted(false)
    },300)
    return ()=> {
      clearTimeout(timer)
    }
  },[items])
  
  return (
    <button className={btnClasses} onClick ={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}
export default HeaderGainLoss