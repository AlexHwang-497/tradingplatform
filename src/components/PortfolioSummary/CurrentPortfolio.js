import { useEffect, useState } from 'react';

import Card from '../UI/Card'
import IndividualSecurity from './IndividualSecurity';
import classes from './CurrentPortfolio.module.css'

// ! this is the quivalen of Avaliablemeals.js

// ! talk to carlos in more detail about our ID#'s here
const CurrentPortfolio = () => {
    const [portfolio,setPortfolio] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState()

    
    useEffect(()=> {
        const fetchPortfolio = async() => {
            const response = await fetch('https://tradingplatform-8a2a3-default-rtdb.firebaseio.com/currentPortfolio.json')
            if(!response.ok){
                throw new Error('Something went wrong!!!')
            }
            console.log('response:'+response)
            const responseData=await response.json()
            const loadedPortfolio=[]

            for(const key in responseData){
                loadedPortfolio.push({
                    key:key,
                    id:responseData[key].id,
                    name:responseData[key].symbol,
                    market:responseData[key].market_value,
                    profit:responseData[key].unrealized_pl


                })
            }
            console.log('loadedPortfolio:'+JSON.stringify(loadedPortfolio))
            setPortfolio(loadedPortfolio)
            setIsLoading(false)
        }
        fetchPortfolio().catch((error)=>{
            setIsLoading(false)
            setHttpError(error.message)
        })
    },[])

    if(isLoading){
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        )
    }

    if(httpError){
        return(
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        )
    }

// !discuss with carlos in regards to thsi part
      const portfolioList =portfolio.map((positions)=> (
          <IndividualSecurity
            key = {positions.key}
            id={positions.id}
            name = {positions.name}
            market = {positions.market}
            profit = {positions.profit}
          />
      )
      
      
      )
      console.log('portfolioList:'+JSON.stringify(portfolio))
      
      return (
          <section className={classes.meals}>
            <Card>
                <ul>{portfolioList}</ul>
            </Card>
          </section>
      )
    }
  
    export default CurrentPortfolio
    