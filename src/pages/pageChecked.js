import React from "react";
import { NavBar } from "../elements/navBar";
import { PopularClaims } from "../elements/popularClaims";
/**
 * Popular checked result page.
 * @param {structure, including logInStats, and other handler functions} props 
 * @returns html of some popular results
 */
export const PageChecked = (props) => {
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