import { Fragment } from "react";

import HeaderGainLoss from "./HeaderGandL";
import mealsImage from '../assets/meals.jpg'
import classes from './Header.Module.css'
import AuthContext,{AuthContextProvider} from "../store/AuthContext";
import { useContext } from "react/cjs/react.development";
// 1.  you started hereaaaaa
// ! double check sith carlos on <HeaderGainLoss onClick={props.onShowCart}/>  how are we able to use onShowCart
const Header = (props)=> {
    const authCtx = useContext(AuthContext)

    const isLoggedIn = authCtx.isLoggedIn
    console.log('isloggedin',isLoggedIn)

    const logoutHandler = () => {
        authCtx.logout()
    }
    
    return(
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <ul>
                    <HeaderGainLoss onClick={props.onShowCart}/>
                    {isLoggedIn && (<button oncClick={logoutHandler}>Logout</button>)}                    

                </ul>
                
            </header>
            <div className={classes['main-image']} >
                <img src ={mealsImage} alt='a table full of delicuos food!'/>
            </div>
            
        </Fragment>
    )
}



export default Header