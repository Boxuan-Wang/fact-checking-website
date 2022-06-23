import React from 'react';
import logo from '../logo.svg';

/**
 * 
 * @param {a structure including logInStats, and other handler functions} props 
 * @returns html file of the top bar frequently used in different pages
 */
export const TopBar = (props) => {
  // for the constructor, need a field: logInStats
    if (props.logInStats.log===false) {
      return (
        <header>
          <img src={logo} className="app-logo" alt='logo' />
          <button onClick={() => props.onPageChange("checked")}>Checked</button>
          <button onClick={() => props.onPageChange("newClaim")}>New Claim</button>
          <button onClick={() => props.onPageChange("aboutUs")}>About Us</button>
          <button className="signInButton" onClick={() => props.onPageChange("signIn")}>Sign In</button>
          <button onClick={() => props.onPageChange("signUp")}>Sign Up</button>
        </header>
      );
    } else {
      return (
        <header>
          <img src={logo} className='app-logo' alt='logo' />
          <button onClick={() => props.onPageChange("checked")}>Checked</button>
          <button onClick={() => props.onPageChange("newClaim")}>New Claim</button>
          <button onClick={() => props.onPageChange("aboutUs")}>About Us</button>
          <p className="userName">{props.logInStats.userName}</p>
          <button onClick={() => props.onLogInChange({log:false, userName: undefined})}>Sign Out</button>
        </header>
      );
    }
}
