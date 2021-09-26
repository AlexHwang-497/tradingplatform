import { useEffect, useState } from 'react';

import Card from '../UI/Card'
import IndividualSecurity from './IndividualSecurity';
import classes from './CurrentPortfolio.module.css'

// ! this is the quivalen of Avaliablemeals.js

// ! talk to carlos in more detail about our ID#'s here
const CurrentPortfolio = () => {
    const [portfolio,setPortfolio] = useState([])
    
    useEffect(()=> {
        const fetchPortfolio = async() => {
            const response = await fetch('https://tradingplatform-8a2a3-default-rtdb.firebaseio.com/currentPortfolio.json')
            console.log('response:'+response)
            const responseData=await response.json()
            const loadedPortfolio=[]

            for(const key in responseData){
                loadedPortfolio.push({
                    id:key,
                    name:responseData[key].symbol,
                    market:responseData[key].market_value,
                    profit:responseData[key].unrealized_pl


                })
            }
            console.log('loadedPortfolio:'+JSON.stringify(loadedPortfolio))
            setPortfolio(loadedPortfolio)
        }
        fetchPortfolio()
    },[])


      const portfolioList =portfolio.map((positions)=> (
          <IndividualSecurity
            key = {positions.key}
            id={positions.id}
            name = {positions.symbol}
            market = {positions.market_value}
            profit = {positions.unrealized_pl}
          />
      )


      
      )
      
      return (
          <section className={classes.meals}>
            <Card>
                <ul>{portfolioList}</ul>
            </Card>
          </section>
      )
    }
  
    export default CurrentPortfolio
    