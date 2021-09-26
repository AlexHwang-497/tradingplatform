import { Fragment } from "react";
import SummaryOfPortfolio from "./SummaryOfPortfolio";

import CurrentPortfolio from "./CurrentPortfolio";
// ! this is the equivalent of meals.js


const portfolioSummary = () => {
    return (
        <Fragment>
            <SummaryOfPortfolio/>
            <CurrentPortfolio/>
        </Fragment>
    )
}


export default portfolioSummary