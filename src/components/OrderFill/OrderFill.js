import { useEffect, useState} from 'react';

import Card from '../UI/Card'
import IndividualSecurity from '../PortfolioSummary/IndividualSecurity';
import classes from '../PortfolioSummary/CurrentPortfolio.module.css'
import AuthContext, { AuthContextProvider } from '../store/AuthContext';
import { useContext } from 'react/cjs/react.development';
import OrderFillIndividualSecurity from './OrderFillIndividualSecurity';


// ! this is the quivalen of Avaliablemeals.js

// ! talk to carlos in more detail about our ID#'s here
const OrderFill = () => {
    const authCtx=useContext(AuthContext)
    const [portfolio,setPortfolio] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState()
    const [userId,setUserId] = useState('7Z7GR3aBiteuilxpL4R8Y3Z60Yl2')
    
    console.log('this is the authCtx in the OrderFill',authCtx)
    console.log('this is the userId in OrderFill:',userId)
    
    useEffect(()=> {
        const fetchPortfolio = async() => {
            const response = await fetch('https://tradingplatform-8a2a3-default-rtdb.firebaseio.com/orders.json')
            if(!response.ok){
                throw new Error('Something went wrong!!!')
            }
            console.log('Order fill response:',response)
            const responseData=await response.json()
            console.log('Order fill responseData:',responseData)

            const filteredResponse = responseData
            // console.log('Order fill filteredResponse:',filteredResponse)




            const loadedPortfolio=[]

            for(const key in responseData){
                loadedPortfolio.push({
                    key:key,
                    id:responseData[key]['user'].userId,
                    name:responseData[key]['user'].symbol,
                    orderType:responseData[key]['user'].order,
                    orderPrice:responseData[key]['user'].transactionPrice,
                    quantity:responseData[key]['user'].quantity
                    


                })
            }
            console.log('this is the loadedPortfolio in OrderFill:',loadedPortfolio)
            const filterData = loadedPortfolio.filter(el=> el.id===userId)
            console.log('this is the filtered data in OrderFill:',filterData)
            setPortfolio(filterData)
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








    console.log('this is the portfoio in the map of portfolioList:',portfolio)
      const portfolioList =portfolio.map((positions)=> (
          <OrderFillIndividualSecurity
            key = {positions.key}
            id={positions.id}
            name = {positions.name}
            orderType = {positions.orderType}
            orderPrice = {positions.orderPrice}
            quantity = {positions.quantity}
            
          />
      )
      
      
      )
      console.log('this is the portfolioList in Orderfill:',portfolioList)
      
      return (
          <section className={classes.meals}>
            <Card>
                <h1>this is for the order fill</h1>

                <ul>{portfolioList}</ul>
            </Card>
            
          </section>
      )
    }
  
    export default OrderFill
    