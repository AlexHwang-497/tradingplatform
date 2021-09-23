import classes from './StockItemForm.module.css'
import Input from '../UI/Input'
// ! this is the equivalent of MealItemForm.js
const StockItemForm = (props)=>{
    return (
        <form className ={classes.form}>
            <Input
                label='# of Shares'
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1',
                }}
            />

            <button>+Add</button>
        </form>
    )

}

export default StockItemForm