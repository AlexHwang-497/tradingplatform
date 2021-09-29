// prettier-ignore
import { useEffect, useState } from "react";

import Card from "../UI/Card"
import classes from "./LatestQuote.module.css"
import apisauce from "apisauce"
import config from "./config"

const LatestQuotes = () => {
  const api = apisauce.create({
    baseURL: config.APCA_API_BASE_URL,
    headers: {
      "APCA-API-KEY-ID": config.APCA_API_KEY_ID,
      "APCA-API-SECRET-KEY": config.APCA_API_SECRET_KEY
    },
    timeout: 5000
  })
  console.log("api Latest:" + JSON.stringify(api))

  const getAccount = () => {
    api.get("v2/account")
  }
  console.log("getAccount Latest:" + JSON.stringify(getAccount))

  useEffect(() => {
    const fetchLatestQuote = async () => {
      const response = await fetch(
        "https://data.alpaca.markets/v2/stocks/AAPL/quotes/latest",
        {
          headers: {
            //  ******* PLUG YOUR KEYS IN THIS IS MINE *******
            "APCA-API-KEY-ID": "PK3D01M5BLDOGCCV4P5X",
            //  ******* PLUG YOUR KEYS IN THIS IS MINE *******
            "APCA-API-SECRET-KEY": "ECSu6RXNIRAhpV8RvQNlKPceVWHwFzKPKnLIn1um"
          }
        }
      )
      if (!response.ok) {
        throw new Error("Something went wrong!!!")
      }
      const responseData = await response.json()
      console.table(responseData)
      const loadQuote = []
    }
    fetchLatestQuote()
  }, [])

  // d55fa92649a73345ab992bcd3b776acd    --client id
  //ece54bc871926a061f0460ca6522fd24c29f78a9 -- client secret

  return (
    <Card>
      <div>Here are the LatestQuote</div>
    </Card>
  )
}

export default LatestQuotes
