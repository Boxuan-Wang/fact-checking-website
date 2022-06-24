import React from "react";
import { TopBar } from "../elements/topbar";
/**
 * Page for presenting a fact-checking result, both from the machine and from human check database.
 * @param {a structure including logInStats,other handler functions and result to show} props 
 * @returns The detail presentation of a result. 
 */
export const PageResult = (props) => {
    return (
        <>
        <TopBar
            logInStats={props.logInStats}
            onPageChange={props.onPageChange}
            onLogInChange={props.onLogInChange} />
        <div>{props.resultToShow.claim}</div>
        </>
    );
};