import React from "react";
import { TopBar } from "../elements/topbar";

export const PageSignUp = (props) => {
    return (
        <>
        <TopBar 
        logInStats={props.logInStats}
        onPageChange={props.onPageChange}
        onLogInChange={props.onLogInChange} />
        <p>This is sign up page.</p>
        </>
    )
};