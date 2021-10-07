import { useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext, { AuthContextProvider } from "../store/AuthContext";
import classes from './MainNavigation.module.css'


const MainNavigation = () => {
    const authCtx = useContext(AuthContext)

    const isLoggedIn =  authCtx.isLoggedIn

    const logoutHandler = () =>{

    }

    return (
        <header className={classes.header}>
          <Link to='/'>
            <div className={classes.logo}>React Auth</div>
          </Link>
          <nav>
            <ul>
              {!isLoggedIn && (
                <li>
                  <Link to='/auth'>Login</Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        </header>
      );
    };

export default MainNavigation