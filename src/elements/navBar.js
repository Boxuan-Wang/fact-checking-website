import React from 'react';
import logo from '../logo.svg';
import "./navBar.css";

/**
 * 
 * @param {a structure including logInStats, and other handler functions} props 
 * @returns html file of the top bar frequently used in different pages
 */
export const NavBar = (props) => {
  // for the constructor, need a field: logInStats
    if (props.logInStats.log===false) {
      return (
        <div className='nav'>
          <img src={logo} className="app-logo" alt='logo' onClick={() => props.onPageChange("main")}/>
          <button className='page' onClick={() => props.onPageChange("checked")}>Checked</button>
          <button className='page' onClick={() => props.onPageChange("newClaim")}>New Claim</button>
          <button className='page' onClick={() => props.onPageChange("aboutUs")}>About Us</button>
          <button className="signInButton" onClick={() => props.onPageChange("signIn")}>Sign In</button>
          <button className='signUpButton' onClick={() => props.onPageChange("signUp")}>Sign Up</button>
        </div>
      );
    } else {
      return (
        <div className='nav'>
          <img src={logo} className='app-logo' alt='logo' />
          <button className='page' onClick={() => props.onPageChange("checked")}>Checked</button>
          <button className='page' onClick={() => props.onPageChange("newClaim")}>New Claim</button>
          <button className='page' onClick={() => props.onPageChange("aboutUs")}>About Us</button>
          <button className="userName">{props.logInStats.userName}</button>
          <button className='signOutButton'onClick={() => props.onLogInChange({log:false, userName: undefined})}>Sign Out</button>
        </div>
      );
    }
}
