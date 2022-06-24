import { useState } from "react";
import { TopBar } from "../elements/topbar";
import React from "react";


/**
 * On receiving a claim to check, call both API to get two results.
 * @param {a string claim to check} inputClaim 
 * @returns Both auto-check result and human check result.
 */
function searchResult(inputClaim) {
    //TODO: call API
    return ({
        claim: inputClaim,
        autoResult:"autoResult",
        humanResult:"humanResult"
    });
}

/**
 * The page where logged users can make a new claim.
 * @param {a structure including logInStats, and other handler functions} props 
 */
export const PageNewClaim = (props) => {
    const [inputClaim,setInputClaim] = useState("Input");
    return (
        <><TopBar 
        logInStats={props.logInStats}
        onPageChange={props.onPageChange}
        onLogInChange={props.onLogInChange} />
        <form>
            <input type="txt" value={inputClaim} onChange={e => setInputClaim(e.target.value)} />
            <button onClick={() => props.onResultChange(searchResult(inputClaim))}>Make the Claim!</button>
        </form></>
    );
};
