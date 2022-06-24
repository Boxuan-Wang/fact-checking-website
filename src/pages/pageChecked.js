import React from "react";
import { TopBar } from "../elements/topbar";
/**
 * Popular checked result page.
 * @param {structure, including logInStats, and other handler functions} props 
 * @returns html of some popular results
 */
export const PageChecked = (props) => {
    return (
        <><TopBar
            logInStats={props.logInStats}
            onPageChange={props.onPageChange}
            onLogInChange={props.onLogInChange} /><div><p>This is checked-claim page.</p></div></>
    )
};