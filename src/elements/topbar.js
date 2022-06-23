import React from 'react';
import logo from '../logo.svg';

/**
 * 
 * @param {logInStats structure, including: log, userName} props 
 * @returns html file of the top bar frequently used in different pages
 */
export const TopBar = (props) => {
  // for the constructor, need a field: logInStats
    if (props.logInStats.log===false) {
      return (
        <header>
          <img src={logo} className="app-logo" alt='logo' />
          <button >Checked</button>
          <button >New Claim</button>
          <button >About Us</button>
          <button className="signInButton">Sign In</button>
          <button >Sign Up</button>
        </header>
      );
    } else {
      return (
        <header>
          <img src={logo} className='app-logo' alt='logo' />
          <button >Checked</button>
          <button >New Claim</button>
          <button >About Us</button>
          <p className="userName">{props.logInStats.userName}</p>
          <button >Sign Out</button>
        </header>
      );
    }
}
