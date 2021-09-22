import { Fragment } from "react";
import SummaryOfPortfolio from "./SummaryOfPortfolio";

import CurrentPortfolio from "./CurrentPortfolio";



const portfolioSummary = () => {
    return (
        <Fragment>
            <SummaryOfPortfolio/>
            <CurrentPortfolio/>
        </Fragment>
    )
}


export default portfolioSummary