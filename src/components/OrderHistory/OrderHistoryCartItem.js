// ! this is the equivalent of CartItem.js

import classes from '../OrderHistory/OrderHistory.module.css'



const OrderHistoryCartItem =(props) =>{
    // ! you need to fix the price thing or find the right amout you want to put there;  this should be share price
    
    return (
        <li className={classes['cart-item']}>
          <div>
            <h2>{props.name}</h2>
            <div className={classes.summary}>
              
              <ul className={classes.amount}> Current Ownership(Mkt) Value: ${props.amount}</ul>
              <ul className={classes.amount}> Share Price:${props.price.toFixed(2)}</ul>
              <ul className={classes.amount}> Quantity: {props.quantity}</ul>
              
            </div>
          </div>
          <div className={classes.actions}>
            <button onClick={props.onRemove}>−</button>
            <button onClick={props.onAdd}>+</button>
          </div>
        </li>
      );
    };

export default OrderHistoryCartItem