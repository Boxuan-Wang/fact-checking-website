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
    
    useEffect(async () => {
        console.error();("IN USEFFECT scope!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");
        getPopular().then((res) => setPopularClaims(res)).catch(err => console.error(err));
    });

    function PopularClaims() {        
        if(popularClaims===null) {
            // await getPopular().then((res) => setPopularClaims(res)).catch(err => console.error(err));
            console.error("popular claims is null.")
        }

        const listItems = popularClaims.map(
            (result) =>
              <li>
                <ResultPresent format="short" result={result}/>
              </li>,
        );
    
        return (
          <ul>{listItems}</ul>
        );
    };

    return (
        <>
        <NavBar
        logInStats={props.logInStats}
        onPageChange={props.onPageChange}
        onLogInChange={props.onLogInChange} />
        <div>
            <PopularClaims />
        </div>
        </>
    )
};