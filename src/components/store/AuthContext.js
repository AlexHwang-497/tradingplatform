import React, {useCallback, useState, useEffect} from 'react'

let logoutTimer;

const AuthContext= React.createContext({
    token:'',
    isLoggedIn: false,
    userId:'',
    login:(token)=> {},
    logout:()=>{}
})



const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime()
    const adjExpirationTime = new Date(expirationTime).getTime()

    const remainingDuration = adjExpirationTime - currentTime

    return remainingDuration
}
const retrieveUserId = ()=>{
    const aaaaa = localStorage.getItem('currentUserId')
    console.log('aaaaa',aaaaa)

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

    console.log('storedToken',JSON.stringify(storedToken))
    return {
        token:storedToken,
        duration: remainingTime
        
    }
}



export const AuthContextProvider = (props) =>{
    console.log('props inside of AuthContextProvider',props)
    const tokenData = retrieveStoredToken()
    const usersData = retrieveUserId()

    let initialToken

    if(tokenData){
        initialToken = tokenData.token
    }

    const [userId, setUserId] = useState('')

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
    const loginHandler = (token, expirationTime,userId) => {
        setToken(token)
        setUserId(userId)
        localStorage.setItem('token',token)
        localStorage.setItem('expirationTime',expirationTime)    
        localStorage.setItem('userId',userId)    
        console.log('locla storage expiration time', expirationTime)
        
        const remainingTime = calculateRemainingTime(expirationTime)
        logoutTimer=setTimeout(logoutHandler,remainingTime)
        
    }

    console.log('inside AUthContext', token)

    useEffect(()=> {
        if(tokenData){
            // console.log(tokenData.duration)
            logoutTimer=setTimeout(logoutHandler, tokenData.duration)
        }
    },[tokenData,logoutHandler])

    
// * this is actually your state value; this is a piece of state.  this is what is provided to all other componets
    const contextValue =  {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        userId:userId
    }
// ! ask carlos why we need .provoider
    return (
        <AuthContext.Provider value = {contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext