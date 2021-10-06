import { useEffect, useState, React } from "react";import Card from "../UI/Card"
import classes from "./LatestQuote.module.css"
import apisauce from "apisauce"
import config from "./config"
import OrderForm from "../OrderForm/OrderForm";
import OrderHistory from "../OrderHistory/OrderHistory";

const LatestQuotes = (props) => {
    const [quotePrice,setQuotePrice]=useState([])
    const [stockSymbol,setStockSymbol]=useState(''.toUpperCase())

    const aaa = props.enteredSymbol
    // console.log('aaa',aaa)
  const api = apisauce.create({
    baseURL: config.APCA_API_BASE_URL,
    headers: {
      "APCA-API-KEY-ID": config.APCA_API_KEY_ID,
      "APCA-API-SECRET-KEY": config.APCA_API_SECRET_KEY
    },
    timeout: 5000
  })
//   console.log("api Latest:" + JSON.stringify(api))
//   console.log("getAccount Latest:" + JSON.stringify(getAccount))

// console.log('security',props.enteredSymbol)
useEffect(() => {
    const security= props.enteredSymbol || 'amzn'
    
    const fetchLatestQuote = async () => {
      
      const response = await fetch(
        `https://data.alpaca.markets/v2/stocks/${security}/trades/latest`,
        {
          headers: {
            //  ******* PLUG YOUR KEYS IN THIS IS MINE *******
            "APCA-API-KEY-ID": config.APCA_API_KEY_ID,
            //  ******* PLUG YOUR KEYS IN THIS IS MINE *******
            "APCA-API-SECRET-KEY": config.APCA_API_SECRET_KEY
          }
        }
      )
      if (!response.ok) {
        throw new Error("Something went wrong!!!")
      }
      const responseData = await response.json()
      console.table(responseData)
      // console.log('response quote'+JSON.stringify(responseData.quote))
      const loadQuote = []

      // const stockData = loadQuote.push(responseData.map((data)=> {
      //   symbol:responseData.symbol,
      //   currentPrice:responseData.trade.p
      // }))

      for(const key in responseData){
          loadQuote.push({
              symbol:responseData.symbol,
              currentPrice:responseData.trade.p
          })
      }
      // console.log('loadquote',loadQuote)
      setQuotePrice(loadQuote)
      

    }
    fetchLatestQuote()
}, [stockSymbol])
// console.log('quotePrice',JSON.stringify(quotePrice))

  const currentPrice = quotePrice.map((data)=>(data.currentPrice))
  const symbol = quotePrice.map((data)=>(data.symbol))
  
  
  
  const submitOrderHandler = async(userData) => {
    console.log('you just submitted an order')
      
      const response = await fetch('https://tradingplatform-8a2a3-default-rtdb.firebaseio.com/orders.json',{
          method:'POST',
          body:JSON.stringify({
            user:userData
              
          })
          
      })
      const data = await response.json();
      console.log('data',data)
      console.log('the order has been submitted')
      // setStockSymbol(security)

  }

  return (
    <Card>
      
      <h1>Here are the Symbol: {symbol[0]}</h1>
      <h2>Here are the Current Price:${currentPrice[0]}</h2>
      <OrderForm onConfirm={submitOrderHandler}/>
    </Card>
  )
}

export default LatestQuotes 