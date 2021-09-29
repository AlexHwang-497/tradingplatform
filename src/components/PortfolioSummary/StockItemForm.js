import {useRef,useState} from 'react'

import classes from './StockItemForm.module.css'
import Input from '../UI/Input'
// * this will submit the number of shares into our cart
// ! this is the equivalent of MealItemForm.js
const StockItemForm = (props)=>{
    const [amountIsValid,setAmountIsValid] = useState(true)
    const amountInputRef = useRef()

    const submitHandler =(event) =>{
        event.preventDefault()
        const enteredAmount = amountInputRef.current.value
        // * +enteredAmount converts to a number instead of a string
        const enteredAmountNumber = +enteredAmount

        if(
            enteredAmount.trim().length===0 ||
            enteredAmountNumber <1 ||
            enteredAmountNumber>500
        ) {
            setAmountIsValid(false)
            return;
        }
        
        props.onAddToCart(enteredAmountNumber)
    }

    return (
        <form className ={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label='# of Shares'
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '500',
                    step: '1',
                    defaultValue: 1,
                }}
            />

            <button>+Add</button>
        </form>
    )

}

export default StockItemForm