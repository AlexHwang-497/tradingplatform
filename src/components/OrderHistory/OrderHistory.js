// ! this is the equivalent of Cart.js

import classes from '../OrderHistory/OrderHistory.module.css'



const OrderHistory = (props) => {
    const orders = (
        <ul className={classes['cart-items']}>\
            {[{"asset_id": "c1", "symbol": "GOOGL","market_value": "5592.02","unrealized_pl": "87.09",}].map((item)=> (
                <li>{item.symbol}</li>
            ))}
        </ul>
    )
    return(
        <div>
            {orders}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>35.62</span>

            </div>
            <div className={classes.action}> 
                <button className={classes['button--alt']}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
            
        </div> 

    )
}

export default OrderHistory