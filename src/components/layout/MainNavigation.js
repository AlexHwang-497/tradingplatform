import { useContext } from "react"
import { Link } from "react-router-dom"

import classes from './MainNavigation.module.css'


const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <Link to='/'>
                <div className={classes.logo}>React Auth</div>
            </Link>

            <nav>
                <ul>
                    <li>
                        <Link to='/auth'>Login</Link>
                    </li>
                    <li>
                        <Link to='/dashboard'>Dashboard</Link>
                    </li>


                </ul>

            </nav>

        </header>

    )
}

export default MainNavigation