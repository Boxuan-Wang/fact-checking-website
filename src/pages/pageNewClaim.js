import { useState } from "react";
import { NavBar } from "../elements/navBar";
import React from "react";
import { checkClaim } from "../elements/apiCalls";
import "./pageNewClaim.css";
import Popup from "reactjs-popup";

/**
 * On receiving a claim to check, call both API to get two results.
 * @param claim string -- claim to check
 * @param userName string -- user's email
 * @returns Both auto-check result and human check result.
 * Human result: {claim_id, claim_org, claim_text, 
 *   claim_url, publication, publication_date, text}
 */
export async function searchResult(inputClaim, userName) {
    const result = await checkClaim(inputClaim,userName);
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
    const [popOpen, setPopOpen] = useState(false);
    const [popString, setPopString] = useState("");
    const [waiting, setWaiting] = useState(false);
    
    const closePop = 
        () => {
            setPopOpen(false);
            setPopString("");
            props.onPageChange("signIn");
        };
    
    async function handleSubmit (e){
        e.preventDefault();

        if(props.logInStats.log) {
            setWaiting(true);
            const checkResult = await searchResult(inputClaim, props.logInStats.userName);
            setWaiting(false);
            props.onResultChange(checkResult);
        }
        else {
            setPopString("Please sign in first.");
            setPopOpen(true);
        }
        
        
    }

    if(waiting) {
        return (<div>Loading ... </div>);
    }
    else {
        return (
        <><NavBar 
        logInStats={props.logInStats}
        onPageChange={props.onPageChange}
        onLogInChange={props.onLogInChange} />
        <Popup open={popOpen} closeOnDocumentClick onClose={closePop} className="infoPop">
            <div>
                {popString}
            </div>
        </Popup>
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
    }
    
};
