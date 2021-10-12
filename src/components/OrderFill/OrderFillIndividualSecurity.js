import { useContext } from 'react'

import StockItemForm from '../PortfolioSummary/StockItemForm'
import classes from '../PortfolioSummary/IndividualSecurity.module.css'
import CartContext from '../store/CartContext'

// ! this is the equivalent MealItem.js

// ! look at the for(const key in responseData) to get the correct data
const OrderFillIndividualSecurity = (props) =>{
    const cartCtx = useContext(CartContext)
// console.log('stockItemForm:'+JSON.stringify(cartCtx.items))
    const addToCartHandler = (amount) =>{
        cartCtx.addItem({
            id:props.id,
            name:props.name,
            orderType:props.orderType,
            orderPrice:props.orderPrice,
            quantity:props.quantity       
        })
    }

    return (
        <li className = {classes.security}>
            <div>
                <h3 className={classes.name}>Company Ticker:{props.name.toUpperCase()}</h3>
                <div className={classes.market}>OrderType: {props.orderType}</div>
                <div className={classes.profit}>Order Price=${props.orderPrice}</div>
                <div className={classes.profit}>Quantity#: {props.quantity}</div>
            </div>
            <div>
                <StockItemForm id={props.id} onAddToCart={addToCartHandler} />
            </div>

        </li>
    )
}

export default OrderFillIndividualSecurity
