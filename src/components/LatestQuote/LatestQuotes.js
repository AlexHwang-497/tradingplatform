import { useEffect, useState, React } from "react";import Card from "../UI/Card"
import classes from "./LatestQuote.module.css"
import apisauce from "apisauce"
import config from "./config"
import OrderForm from "../OrderForm/OrderForm";
import OrderHistory from "../OrderHistory/OrderHistory";
import AuthForm from "../AuthForm/AuthForm";


const LatestQuotes = (props) => {
    const [userId, setUserId] = useState('')
    const [quotePrice,setQuotePrice]=useState([])
    const [stockSymbol,setStockSymbol]=useState('')

    
    

    const aaa = props.enteredSymbol
    console.log('aaa',aaa)
  const api = apisauce.create({
    baseURL: config.APCA_API_BASE_URL,
    headers: {
      "APCA-API-KEY-ID": config.APCA_API_KEY_ID,
      "APCA-API-SECRET-KEY": config.APCA_API_SECRET_KEY
    },
    timeout: 5000
  })
  
console.log('security',props.enteredSymbol)
useEffect(() => {
    const security= stockSymbol || 'spy'
    
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
      console.log('loadquote',loadQuote)
      setQuotePrice(loadQuote)
    }
    fetchLatestQuote()
}, [stockSymbol])
// console.log('quotePrice',JSON.stringify(quotePrice))

  const currentPrice = quotePrice.map((data)=>(data.currentPrice))
  const symbol = quotePrice.map((data)=>(data.symbol))
  console.log('currentPrice',currentPrice)
  console.log('symbol',symbol)


  const symbolChangerHandler = (event) =>{
    setStockSymbol(stockSymbol[0])
}


  const submitOrderHandler = async(userData) => {
    console.log('you just submitted an order')

    // setStockSymbol(stockSymbol[0])
    console.log('stocksymbol',userData.symbol)
    setStockSymbol(userData.symbol)
      const response = await fetch('https://tradingplatform-8a2a3-default-rtdb.firebaseio.com/orders.json',{
          method:'POST',
          body:JSON.stringify({
            user:userData
          })  
      })
      const data = await response.json();
      console.log('data',data)
      console.log('userData',userData)
      console.log('the order has been submitted')
      // setStockSymbol(security)
  }

  return (
    <section className={classes.auth}>
      <Card>
        <h1>Current Company:{symbol[0]}</h1>
        <h1>Here are the Current Price:${currentPrice[0]}</h1>
      </Card>
        <OrderForm onConfirm={submitOrderHandler}/>
    </section>
  )
}

export default LatestQuotes 