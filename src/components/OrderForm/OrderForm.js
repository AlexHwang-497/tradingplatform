import {useState, useRef, useEffect} from 'react'
import Card from '../UI/Card'
import classes from './OrderForm.module.css'
import LatestQuotes from '../LatestQuote/LatestQuotes';
import CartContext from '../store/CartContext';

const isEmpty = (value) => value.trim==='';

const OrderForm =(props) =>{
    const [formInputsValidity,setFormInputValidity] = useState({
        symbol:true,
        quantity:true,
        order:true,
        transactionPrice:true
    })
    const [postSymbol,setStockSymbol]=useState('')
    const [postQuantity,setStockQuanity]=useState('')
    const [postOrder,setOrder]=useState('')
    const [postTransaction,setTransactionPrice]=useState('')


    
    const symbolInputRef=useRef()
    const qtyInputRef=useRef()
    const orderInputRef=useRef()
    const transactionInputRef = useRef()

    const confirmHandler = (event)=>{
        event.preventDefault()

        const enteredSymbol = symbolInputRef.current.value
        setStockSymbol(enteredSymbol)
        const enteredQty = qtyInputRef.current.value
        setStockQuanity(enteredQty)
        const enteredOrder= orderInputRef.current.value
        setOrder(enteredOrder)
        const enteredTransactionPrice=transactionInputRef.current.value
        setTransactionPrice(enteredTransactionPrice)

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

        setStockSymbol(enteredSymbol)
        console.log('stockSymbol',JSON.stringify(postSymbol))

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

    //   console.log('symbolInputRef:',symbolInputRef.current.value)
    //   console.log('qtyInputRef:',qtyInputRef.current.value)
    //   console.log('orderInputRef:',orderInputRef.current.value)
    //   console.log('transactionInputRef:',transactionInputRef.current.value)
      


    return (
        <Card>
            <form className={classes.form} onSubmit={confirmHandler}>
                <div className={classes.control}>
                    <label htmlFor='Symbol'>Symbol</label>
                    <input type='text' id='symbol' ref={symbolInputRef}  />
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
                    <button type='button' >
                        Cancel
                    </button>
                    <button className={classes.submit} >Confirm</button>
                </div>
            </form>
        </Card>


    )
}

export default OrderForm