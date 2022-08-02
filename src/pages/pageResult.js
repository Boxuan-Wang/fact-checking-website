import React from "react";
import { NavBar } from "../elements/navBar";
import { ResultPresent } from "../elements/resultPresent";
import "../pages/pageResult.css";
/**
 * Page for presenting a fact-checking result, both from the machine and from human check database.
 * @param {a structure including logInStats,other handler functions and result to show} props 
 * @returns The detail presentation of a result. 
 */
export const PageResult = (props) => {
    const human_result_list_item = props.resultToShow.human_result.map(
        (result) => 
        <li className="human_result">
            <ResultPresent format="short_human_result" result={result}/>
        </li>
    );

    return (
        <>
        <NavBar
            logInStats={props.logInStats}
            onPageChange={props.onPageChange}
            onLogInChange={props.onLogInChange} />
        <div className="result_title">{"Claim:  " + props.resultToShow.claim}</div>
        <div className="human_result_list">
            <ul className="humanCheckList">{human_result_list_item}</ul>
        </div>
        </>
    );
};