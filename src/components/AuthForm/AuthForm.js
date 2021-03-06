import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthPage from "../../pages/AuthPage";
import OrderForm from "../OrderForm/OrderForm";
import AuthContext from "../store/AuthContext";

import classes from './AuthFrom.module.css'

const AuthForm =()=>{
    const history = useHistory()
    const emailInputRef = useRef()
    const passowrdInputRef= useRef()

    const authCtx = useContext(AuthContext)

    const [isLogin, setIsLogin] = useState(true)
    const [isLoading,setIsLoading] = useState(false)
    // *this is the current user's ID
    const [userId, setUserId] = useState('')

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
      };

    const submitHandler = (event) => {
        event.preventDefault()

        const enteredEmail = emailInputRef.current.value    
        const enteredPassword = passowrdInputRef.current.value

        let url;

        if(isLogin){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPAkjareXDv3BVtWIA8pF1W8PBayWMeY8';

        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPAkjareXDv3BVtWIA8pF1W8PBayWMeY8';
        }

        fetch(url,{
            method:'POST',
            body: JSON.stringify({
                email:enteredEmail,
                password:enteredPassword,
                returnSecureToken: true,
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            setIsLoading(false)
            if(res.ok){
                return res.json()

            } else {
                return res.json().then((data)=>{
                    let errorMessage='Authentication failed!'
                    throw new Error(errorMessage)
                })
            }
        })
        
        .then((data)=>{
            console.log('data in authForm', data)
            setUserId(data.localId)
            
            const currentUserId = data.localId
            // console.log('curent user in auth form',currentUserId)

            
            

            const expirationTime=new Date(
                new Date().getTime() +  +data.expiresIn*1000
            )
            authCtx.login(data.idToken, expirationTime.toISOString(),data.localId)
            
            history.replace('/')

        })
        .catch((err)=>{
            alert(err.message)
        })

    }
    console.log('userId',userId)
    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef}></input>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your password</label>
                    <input type='password' id='password' required ref={passowrdInputRef}></input>
                </div>
                <div className={classes.actions}>
                    {!isLoading && <button> {isLogin ? 'Login' : 'Create Account'}</button>}
                    {isLoading && <p>Sending Request.............</p>}
                    
                    <button type ='button' className = {classes.toggle} onClick={switchAuthModeHandler}>
                        {isLogin? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>

    )

}


export default AuthForm