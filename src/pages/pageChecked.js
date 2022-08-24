import React, { useEffect, useState } from "react";
import { NavBar } from "../elements/navBar";
import { getHistory } from "../elements/apiCalls";
import { ResultPresent } from "../elements/resultPresent";
import { searchResult } from "./pageNewClaim";
import "./pageChecked.css"

/**
 * Popular checked result page.
 * @param {structure, including logInStats, and other handler functions} props 
 * @returns html of some popular results
 */
export const PageChecked =  (props) => {
    
    const [historyClaims, setHistoryClaims] = useState(null);
    const [waiting, setWaiting] = useState(false);

    const checkAgain = async (claim, userName) => {
        setWaiting(true);
        const result = await searchResult(claim, userName);
        setWaiting(false);
        props.onResultChange(result);
        props.onPageChange("result");
      };

    useEffect(() => {
        async function fetch() {
            const res = await getHistory(props.logInStats.userName);
            setHistoryClaims(res);
        }
        if(props.logInStats.log) {
            fetch();
        }
        else {
            setHistoryClaims([]);
        }
                
    },[]);

    if(!historyClaims || waiting) {
        console.log("waiting\n");
        return "loading...";
    }

    return (
        <>
        <NavBar
        logInStats={props.logInStats}
        onPageChange={props.onPageChange}
        onLogInChange={props.onLogInChange} />
        <div>
            <ul className="historyList">
                {historyClaims.length ===0 ? 
                <div>No history</div>:
                historyClaims.map((result) =>
                <li key={result.date} className='historyEntry' onClick={() => checkAgain(result.claim, props.logInStats.userName)}>
                    <ResultPresent format="history" 
                    result={result} 
                    />
                </li>)
                }
            </ul>
        </div>
        </>
    )
};