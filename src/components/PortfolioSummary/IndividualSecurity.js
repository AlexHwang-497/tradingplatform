import classes from './IndividualSecurity.module.css'
import StockItemForm from './StockItemForm'

const IndividualSecurity = (props) =>{
    return (
        <li className = {classes.security}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.market}>MarketValue={props.market}</div>
                <div className={classes.profit}>TotalProfit={props.profit}</div>
            </div>
            <div>
                {/* <StockItemForm id={props.id}/> */}
            </div>

        </li>
    )
}

export default IndividualSecurity
