import React from "react";
import { TopBar } from "../elements/topbar";
/**
 * Contact and information page.
 * @param {structure, including logInStats, and other handler functions} props 
 * @returns info about developers
 */
export const PageAboutUs = (props) => {
    return (
        <><TopBar
            logInStats={props.logInStats}
            onPageChange={props.onPageChange}
            onLogInChange={props.onLogInChange} />
            <p>In about us page!</p>
        </>
    );
};