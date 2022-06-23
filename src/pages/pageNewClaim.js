import { useState } from "react";
import { TopBar } from "../elements/topbar";
import React from "react";
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
            <button onClick={() => props.onPageChange("result")}>Make the Claim!</button>
        </form></>
    );
};
