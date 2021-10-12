import { useContext } from 'react'

import StockItemForm from './StockItemForm'
import classes from './IndividualSecurity.module.css'
import CartContext from '../store/CartContext'

// ! this is the equivalent MealItem.js

// ! look at the for(const key in responseData) to get the correct data
const IndividualSecurity = (props) =>{
    const cartCtx = useContext(CartContext)
// console.log('stockItemForm:'+JSON.stringify(cartCtx.items))
    const addToCartHandler = (amount) =>{
        cartCtx.addItem({
            id:props.id,
            name:props.name,
            amount:amount,
            price: props.price,
            market:props.market
            
        })
    }

    return (
        <li className = {classes.security}>
            <div>
                <h3 className={classes.name}>{props.name}</h3>
                <div className={classes.market}>MarketValue=${props.market}</div>
                <div className={classes.profit}>TotalProfit=${props.profit}</div>
                <div className={classes.profit}># of shares: {props.amount}</div>
            </div>
            <div>
                <StockItemForm id={props.id} onAddToCart={addToCartHandler} />
            </div>

        </li>
    )
}

export default IndividualSecurity
