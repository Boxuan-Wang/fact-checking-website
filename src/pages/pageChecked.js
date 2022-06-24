import React from "react";
import { TopBar } from "../elements/topbar";
import { PopularClaims } from "../elements/popularClaims";
/**
 * Popular checked result page.
 * @param {structure, including logInStats, and other handler functions} props 
 * @returns html of some popular results
 */
export const PageChecked = (props) => {
    return (
        <>
        <TopBar
        logInStats={props.logInStats}
        onPageChange={props.onPageChange}
        onLogInChange={props.onLogInChange} />
        <div>
            <PopularClaims />
        </div>
        </>
    )
};