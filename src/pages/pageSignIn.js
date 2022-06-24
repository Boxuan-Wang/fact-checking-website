import React from "react";
import { TopBar } from "../elements/topbar";

/**
 * Page where users sign in.
 * @param {a structure including logInStats, and other handler functions} props 
 * @returns sign-in page, input boxes
 */
export const PageSignIn = (props) => {
    return (
        <>
        <TopBar 
        logInStats={props.logInStats}
        onPageChange={props.onPageChange}
        onLogInChange={props.onLogInChange} />
        <p>This a sign-in page.</p>
        </>
       
    );
};