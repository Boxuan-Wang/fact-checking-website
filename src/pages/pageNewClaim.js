import { useState } from "react";
import { NavBar } from "../elements/navBar";
import React from "react";
import { checkClaim } from "../elements/apiCalls";
import "./pageNewClaim.css";

/**
 * On receiving a claim to check, call both API to get two results.
 * @param {a string claim to check} inputClaim 
 * @returns Both auto-check result and human check result.
 * Human result: {claim_id, claim_org, claim_text, 
 *   claim_url, publication, publication_date, text}
 */
async function searchResult(inputClaim) {
    const result = await checkClaim(inputClaim);
    return ({
        claim: inputClaim,
        fever_result: result.fever_result,
        human_result: result.human_result
    });
}



/**
 * The page where logged users can make a new claim.
 * @param {a structure including logInStats, and other handler functions} props 
 */
export const PageNewClaim = (props) => {
    const [inputClaim,setInputClaim] = useState("");
    
    async function handleSubmit (e){
        e.preventDefault();

        if(props.logInStats.log) {
           const checkResult = await searchResult(inputClaim);
            props.onResultChange(checkResult);
        }
        else {
            alert("Please sign in first.");
            props.onPageChange("signIn");
        }
        
        
    }

    return (
        <><NavBar 
        logInStats={props.logInStats}
        onPageChange={props.onPageChange}
        onLogInChange={props.onLogInChange} />
        <div className="newClaim-box">
            <form className="newClaimForm" onSubmit={handleSubmit}>
                <textarea 
                    value={inputClaim} 
                    onChange = {e => setInputClaim(e.target.value)}
                    className="new-claim-text"/> 
                <input className="submit-button" type="submit" value="Make the Claim!"/>
            </form>
        </div>
        </>
    );
};
