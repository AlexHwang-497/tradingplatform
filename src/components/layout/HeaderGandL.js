import classes from './Header.Module.css'
import CartIcon from './CartIcon'
const HeaderGainLoss = (props) => {
    return (
        <button className={classes.button}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>3</span>
        </button>
    )
}

export default HeaderGainLoss