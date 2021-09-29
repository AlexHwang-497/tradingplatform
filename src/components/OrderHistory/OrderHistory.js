import {useContext, useState} from 'react'

import Modal from '../UI/Modal'
import OrderHistoryCartItem from './OrderHistoryCartItem'
import classes from '../OrderHistory/OrderHistory.module.css'
import CartContext from '../store/CartContext'
import Checkout from './Checkout'

// ! this is the equivalent of Cart.js

const OrderHistory = (props) => {
    const [isCheckout,setIsCheckout] = useState(false)
    const cartCtx = useContext(CartContext)
    console.log('1.cartCtx: ' + JSON.stringify(cartCtx.items))
    const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length>0

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount:1})
    }

    const orderHandler =() =>{
        setIsCheckout(true)
    }

    const submitOrderHandler=(userData)=> {
        fetch('https://tradingplatform-8a2a3-default-rtdb.firebaseio.com/currentPortfolio.json',{
            method:'POST',
            body: JSON.stringify({
                user:userData,
                orderedItems:cartCtx.items
            })
        })
    }


    
// ! look in cartcontext's item.  understand what is being pulled in the item

    const orders = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item)=> (
                <OrderHistoryCartItem
                    key={item.id}
                    name ={item.name}
                    amount={item.market}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null,item.id)}
                    onAdd={cartItemAddHandler.bind(null,item)}
                />
            ))}
        </ul>
    )
    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick = {props.onClose}>
                Close
            </button>
            {hasItems && (
                <button className={classes.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    )

    return(
        <Modal onClose = {props.onClose}>
            {orders}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
                {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
                {!isCheckout && modalActions}
        </Modal>
    )
}

export default OrderHistory