import { Fragment } from "react";
import HeaderGainLoss from "./HeaderGandL";
import mealsImage from '../assets/meals.jpg'
import classes from './Header.Module.css'
// 1.  you started here
const Header = (props)=> {
    return(
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderGainLoss/>
            </header>
            <div className={classes['main-image']} >
                <img src ={mealsImage} alt='a table full of delicuos food!'/>
            </div>
            
        </Fragment>
    )
}

export default Header