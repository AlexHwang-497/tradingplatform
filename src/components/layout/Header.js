import { Fragment } from "react";
import classes from '../layout/Header.Module.css'
import HeaderGainLoss from "./HeaderGandL";
// 1.  you started here
const Header = (props)=> {
    return(
        <Fragment>
        <header className={classes.header} >
            <h1>*acct#*</h1>
            <HeaderGainLoss/>
        </header>
            
        </Fragment>
    )
}

export default Header