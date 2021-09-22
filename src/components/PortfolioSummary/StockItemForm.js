import classes from './StockItemForm.module.css'
import Input from '../UI/Input'

const StockItemForm = (props)=>{
    return (
        <form className ={classes.form}>
            <Input
                Label = 'Amount'
                input={{
                    id: 'amount_'+props.id,
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