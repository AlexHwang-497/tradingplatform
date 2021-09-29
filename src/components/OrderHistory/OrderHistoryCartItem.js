// ! this is the equivalent of CartItem.js

import classes from '../OrderHistory/OrderHistory.module.css'



const OrderHistoryCartItem =(props) =>{
    // ! you need to fix the price thing or find the right amout you want to put there;  this should be share price
    const price = `$${props.amount.toFixed(2)}`;
    return (
        <li className={classes['cart-item']}>
          <div>
            <h2>{props.name}</h2>
            <div className={classes.summary}>
              <span className={classes.price}>{price}</span>
              <span className={classes.amount}>  x {props.amount}</span>
              <span className={classes.amount}> y {props.price}</span>
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