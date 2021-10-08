import React, {useCallback, useState, useEffect} from 'react'

let logoutTimer;

const AuthContext= React.createContext({
    token:'',
    isLoggedIn: false,
    login:(token)=> {},
    logout:()=>{}
})

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime()
    const adjExpirationTime = new Date(expirationTime).getTime()

    const remainingDuration = adjExpirationTime - currentTime

    return remainingDuration
}

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token')
    const storedExpirationDate = localStorage.getItem('expirationTime')

    const remainingTime=calculateRemainingTime(storedExpirationDate)
    
    if(remainingTime<=3600){
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')
        return null
    }

    console.log('storedToken',storedToken)
    return {
        token:storedToken,
        duration: remainingTime
    }
}

export const AuthContextProvider = (props) =>{
    const tokenData = retrieveStoredToken()

    let initialToken

    if(tokenData){
        initialToken = tokenData.token
    }

    const [token, setToken] = useState(initialToken)

    const userIsLoggedIn = !!token

    // !speak to carlos on the point of the localStorage
    const logoutHandler = useCallback(() => {
        setToken(null)   
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')

        if(logoutTimer){
            clearTimeout(logoutTimer)
        }
    },[])
// *expirationTime will be provided in authForm aka authCtx.login(data.idToken, expirationTime.toISOString())
    const loginHandler = (token, expirationTime) => {
        setToken(token)
        localStorage.setItem('token',token)
        localStorage.setItem('expirationTime',expirationTime)    
        
        const remainingTime = calculateRemainingTime(expirationTime)
        logoutTimer=setTimeout(logoutHandler,remainingTime)
        // logoutTimer=setTimeout(logoutHandler,remainingTime)
    }

    useEffect(()=> {
        if(tokenData){
            console.log(tokenData.duration)
            logoutTimer=setTimeout(logoutHandler, tokenData.duration)
        }
    },[tokenData,logoutHandler])


    const contextValue =  {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
// ! ask carlos why we need .provoider
    return (
        <AuthContext.Provider value = {contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext