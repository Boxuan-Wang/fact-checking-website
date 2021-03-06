import React, { useEffect, useState } from "react";
import { NavBar } from "../elements/navBar";
import { getPopular } from "../elements/apiCalls";
import { ResultPresent } from "../elements/resultPresent";


/**
 * Popular checked result page.
 * @param {structure, including logInStats, and other handler functions} props 
 * @returns html of some popular results
 */
export const PageChecked =  (props) => {
    
    const [popularClaims, setPopularClaims] = useState(null);

    useEffect(() => {
        async function fetch() {
            const res = await getPopular();
            setPopularClaims(res);
        }
        fetch();        
    });

    if(!popularClaims) {
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
            <ul>
                {popularClaims.map((result) =>
                <li key={result.claim}>
                    <ResultPresent format="short" result={result}/>
                </li>)}
            </ul>
        </div>
        </>
    )
};