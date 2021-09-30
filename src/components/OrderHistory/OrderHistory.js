import React, {useContext, useState} from 'react'

import Modal from '../UI/Modal'
import OrderHistoryCartItem from './OrderHistoryCartItem'
import classes from '../OrderHistory/OrderHistory.module.css'
import CartContext from '../store/CartContext'
import Checkout from './Checkout'

// ! this is the equivalent of Cart.js

const OrderHistory = (props) => {
    const [isCheckout,setIsCheckout] = useState(false)
    const [isSubmitting,setIsSubmitting] = useState(false)
    const [didSubmit,setDidSubmit]= useState(false)
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
        setIsSubmitting(true)
        fetch('https://tradingplatform-8a2a3-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems:cartCtx.items
            })
        })
        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearCart();
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
                    quantity={item.amount}
                    onRemove={cartItemRemoveHandler.bind(null,item.id)}
                    onAdd={cartItemAddHandler.bind(null,item)}
                />
            ))}
        </ul>
    )
    // console.log('orders:'+JSON.stringify(orders))
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

    const cartModalContent= (
        <React.Fragment>
            {orders}
            <div className={classes.total}>
                <span>total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckout && modalActions}
        </React.Fragment>
    )

    const isSubmittingModalContent = <p>Sending order data...........</p>

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>Close</button>
            </div>
        </React.Fragment>
    )
    
    
    return(
        <Modal onClose = {props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}    
        </Modal>
    )
}

export default OrderHistory