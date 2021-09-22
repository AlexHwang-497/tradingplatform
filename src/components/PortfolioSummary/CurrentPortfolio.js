import Card from '../UI/Card'
import IndividualSecurity from './IndividualSecurity';
import classes from './CurrentPortfolio.module.css'

// ! this is the quivalen of Avaliablemeals.js
const DUMMY_DATA = [
    {
        "asset_id": "69b15845-7c63-4586-b274-1cfdfe9df3d8",
        "symbol": "GOOGL",
        "exchange": "NASDAQ",
        "asset_class": "us_equity",
        "asset_marginable": true,
        "qty": "2",
        "avg_entry_price": "2752.465",
        "side": "long",
        "market_value": "5592.02",
        "cost_basis": "5504.93",
        "unrealized_pl": "87.09",
        "unrealized_plpc": "0.0158203646549547",
        "unrealized_intraday_pl": "43.24",
        "unrealized_intraday_plpc": "0.0077927039817762",
        "current_price": "2796.01",
        "lastday_price": "2774.39",
        "change_today": "0.0077927039817762"
    },
    {
        "asset_id": "664e17bd-3e5d-420d-9762-48800a035ba4",
        "symbol": "ASAN",
        "exchange": "NYSE",
        "asset_class": "us_equity",
        "asset_marginable": true,
        "qty": "50",
        "avg_entry_price": "109.28",
        "side": "long",
        "market_value": "5569.5",
        "cost_basis": "5464",
        "unrealized_pl": "105.5",
        "unrealized_plpc": "0.0193081991215227",
        "unrealized_intraday_pl": "-375.5",
        "unrealized_intraday_plpc": "-0.0631623212783852",
        "current_price": "111.39",
        "lastday_price": "118.9",
        "change_today": "-0.0631623212783852"
    },
    {
        "asset_id": "f801f835-bfe6-4a9d-a6b1-ccbb84bfd75f",
        "symbol": "AMZN",
        "exchange": "NASDAQ",
        "asset_class": "us_equity",
        "asset_marginable": true,
        "qty": "1",
        "avg_entry_price": "3401",
        "side": "long",
        "market_value": "3370.65",
        "cost_basis": "3401",
        "unrealized_pl": "-30.35",
        "unrealized_plpc": "-0.0089238459276683",
        "unrealized_intraday_pl": "14.92",
        "unrealized_intraday_plpc": "0.0044461264762064",
        "current_price": "3370.65",
        "lastday_price": "3355.73",
        "change_today": "0.0044461264762064"
    },
    {
        "asset_id": "b0b6dd9d-8b9b-48a9-ba46-b9d54906e415",
        "symbol": "AAPL",
        "exchange": "NASDAQ",
        "asset_class": "us_equity",
        "asset_marginable": true,
        "qty": "20",
        "avg_entry_price": "148.99",
        "side": "long",
        "market_value": "2885.2",
        "cost_basis": "2979.8",
        "unrealized_pl": "-94.6",
        "unrealized_plpc": "-0.0317470971206121",
        "unrealized_intraday_pl": "26.4",
        "unrealized_intraday_plpc": "0.0092346439065342",
        "current_price": "144.26",
        "lastday_price": "142.94",
        "change_today": "0.0092346439065342"
    }
  ];


  const CurrentPortfolio = () => {
      const portfolioList = DUMMY_DATA.map((positions)=> (
          <IndividualSecurity
            key = {positions.asset_id}
            name = {positions.symbol}
            market = {positions.market_value}
            profit = {positions.unrealized_pl}
          />
      )


      
      )
      console.log(portfolioList)
      return (
          <section className={classes.meals}>
            <Card>
                <ul>{portfolioList}</ul>
            </Card>
          </section>
      )
  }
  
  export default CurrentPortfolio
