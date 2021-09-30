import {useRef, useState} from 'react'
import classes from './Checkout.module.css'

const isEmpty = (value) => value.trim==='';
const isFiveChars = (value) => value.trim().length===5



const Checkout = (props) =>{
    const [formInputsValidity,setFormInputValidity] = useState({
        symbol:true,
        quantity:true,
        order:true,
        transactionPrice:true
    })
    
    const symbolInputRef=useRef()
    const qtyInputRef=useRef()
    const orderInputRef=useRef()
    const transactionInputRef = useRef()

    const confirmHandler = (event)=>{
        event.preventDefault()

        const enteredSymbol = symbolInputRef.current.value
        const enteredQty = qtyInputRef.current.value
        const enteredOrder= orderInputRef.current.value
        const enteredTransactionPrice=transactionInputRef.current.value

        const enteredSymbolIsValid = !isEmpty(enteredSymbol)
        const enteredQtyIsValid = !isEmpty(enteredQty)
        const enteredOrderIsValid= !isEmpty(enteredOrder)
        const enteredTransactionPriceIsValid=!isEmpty(enteredTransactionPrice)

        setFormInputValidity({
            symbol:enteredSymbolIsValid,
            quantity:enteredQtyIsValid,
            order: enteredOrderIsValid,
            transactionPrice: enteredTransactionPriceIsValid
        })

        const formIsValid = enteredSymbolIsValid && enteredQtyIsValid && enteredOrderIsValid && enteredTransactionPriceIsValid

        if(!formIsValid){return;}

        props.onConfirm({
            symbol:enteredSymbol,
            quantity:enteredQty,
            order:enteredOrder,
            transactionPrice:enteredTransactionPrice
        })
    }

    const symbolControlClasses = `${classes.control} ${
        formInputsValidity.symbol ? '' : classes.invalid
      }`;
      const quantityControlClasses = `${classes.control} ${
        formInputsValidity.quantity ? '' : classes.invalid
      }`;
      const orderCodeControlClasses = `${classes.control} ${
        formInputsValidity.order ? '' : classes.invalid
      }`;
      const transactionPriceControlClasses = `${classes.control} ${
        formInputsValidity.transactionPrice ? '' : classes.invalid
      }`;


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor='Symbol'>Symbol</label>
                <input type='text' id='symbol' ref={symbolInputRef}/>
                {!formInputsValidity.symbol && <p>Please Enter a Valid Symbol</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='qty'>Quantity</label>
                <input type='text' id='qty' ref={qtyInputRef}/>
                {!formInputsValidity.quantity && <p>Please Enter a Valid Quantity</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='orderType'>Order Type</label>
                <input type='text' id='orderType' ref={orderInputRef}/>
                {!formInputsValidity.order && <p>Please Entere a Valid Order Type</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='transactionPrice'>Buy/Sell Price</label>
                <input type='text' id='transactionPrice' ref={transactionInputRef}/>
                {!formInputsValidity.transactionPrice && <p>Please Entere a Valid Price</p>}
            </div>

            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>

    )
}
export default Checkout