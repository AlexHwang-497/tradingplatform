import { useReducer } from "react";

import CartContext from "./CartContext";

const  defaultCartState = {
    items:[],
    totalAmount:0
}

const cartReducer = (state,action)=>{
    console.log(state)
    if(action.type==='ADD'){
        const updatedItems = state.items.concat(action.item)
        const updatedTotalAmount = state.totalAmount+action.item.price * action.item.amount;
        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount

        }
    }
}

const CartProvider = (props) => {
    // * the goal of this compnent is to manage the current context to data and provide that context to all copnents that want to access it
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
    const addItemToCartHandler=(item)=> {
        dispatchCartAction({type:'ADD', item:item})
    }
    const removeItemToCartHandler=(id)=> {
        dispatchCartAction({type:'REMOVE', id: id})
    }
    const cartContext ={
        items: cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler
    }
    return (
        <CartContext.Provider value = {cartContext}>
            {props.children}
        </CartContext.Provider>
    )

}
export default CartProvider