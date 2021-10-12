import {useState, useRef, useEffect, useContext} from 'react'
import Card from '../UI/Card'
import classes from './OrderForm.module.css'
import LatestQuotes from '../LatestQuote/LatestQuotes';
import CartContext from '../store/CartContext';
import AuthForm from '../AuthForm/AuthForm';
import AuthContext from '../store/AuthContext';


const isEmpty = (value) => value.trim==='';


const OrderForm =(props) =>{
    const authCtx = useContext(AuthContext)
    
    const [formInputsValidity,setFormInputValidity] = useState({
        symbol:true,
        quantity:true,
        order:true,
        transactionPrice:true,
        userId:true
    })
    const [postSymbol,setStockSymbol]=useState('')
    const [postQuantity,setStockQuanity]=useState('')
    const [postOrder,setOrder]=useState('')
    const [postTransaction,setTransactionPrice]=useState('')

    const [postUserId,setUserId] = useState('')
    

    console.log('authCtx in order form',authCtx)
    
    const symbolInputRef=useRef()
    const qtyInputRef=useRef()
    const orderInputRef=useRef()
    const transactionInputRef = useRef()
    const userIdInputRef = useRef()

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
        // const enteredUserId=userIdInputRef.current.value
        // setUserId(enteredUserId)

        const enteredSymbolIsValid = !isEmpty(enteredSymbol)
        const enteredQtyIsValid = !isEmpty(enteredQty)
        const enteredOrderIsValid= !isEmpty(enteredOrder)
        const enteredTransactionPriceIsValid=!isEmpty(enteredTransactionPrice)
        // const enteredUserIdIsValid=!isEmpty(enteredUserId)

        setFormInputValidity({
            symbol:enteredSymbolIsValid,
            quantity:enteredQtyIsValid,
            order: enteredOrderIsValid,
            transactionPrice: enteredTransactionPriceIsValid,
            // userId: enteredUserIdIsValid
        })

        setStockSymbol(enteredSymbol)
        console.log('stockSymbol',JSON.stringify(postSymbol))

        const formIsValid = enteredSymbolIsValid && enteredQtyIsValid && enteredOrderIsValid && enteredTransactionPriceIsValid

        if(!formIsValid){return;}
        
        props.onConfirm({
            symbol:enteredSymbol,
            quantity:enteredQty,
            order:enteredOrder,
            transactionPrice:enteredTransactionPrice,
            userId:authCtx.userId
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
      const userIdControlClasses = `${classes.control} ${
        formInputsValidity.userId ? '' : classes.invalid
      }`;

    

    return (
        <Card>
            <form className={classes.form} onSubmit={confirmHandler}>
                {/* <div className={classes.control}>
                    <label htmlFor='UserID'>UserID</label>
                    <input type='text' id='userID' ref={userIdInputRef}/>
                    {!formInputsValidity.userId && <p>Please Enter a Valid Symbol</p>}
                </div> */}
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

