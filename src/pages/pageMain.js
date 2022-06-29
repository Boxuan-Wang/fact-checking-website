import React from 'react';
import { NavBar } from '../elements/navBar.js';
import { PopularClaims } from "../elements/popularClaims.js"

/**
 *  Introduction, popular results and button
 * @param {a structure including logInStats, and other handler functions} props 
 * @returns Main page of the app.
 */
export const PageMain = (props) => {
  // it should get login info, and should be able to change it
    return (
      <>
        <NavBar 
        logInStats={props.logInStats}
        onPageChange={props.onPageChange}
        onLogInChange={props.onLogInChange} />
        <div className="heading">
          <h1>Auto Fact Checking</h1>
          <p>Enter any claim you can think of.
                Let AI find some evidence and
                justify that for you.</p>
          <button onClick={() => props.onPageChange("newClaim")}>Make A Claim</button>
        </div>
        <div className="popularClaims">
          <h2>Popular Checked Claims</h2>
          <PopularClaims />
        </div>
      </>
    );
}