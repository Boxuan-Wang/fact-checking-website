import React from "react";
import logo from '../logo.svg';

class TopBar extends React.Component {
    //for the constructor, need a field: logIn
    render() {
        if (this.props.logIn===false)
        {
            return (
            <header>
                <img src={logo} className="app-logo" />
                <button >Checked</button>
                <button >New Claim</button>
                <button >About Us</button>
                <button className="signInButton">Sign In</button>
                <button >Sign Up</button>
            </header>
            );
        }
        else {
            return (
                <header>
                    <img src={logo} class='app-logo' />
                    <button >Checked</button>
                    <button >New Claim</button>
                    <button >About Us</button>
                    <p className="userName">{this.props.userName}</p>
                    <button >Sign Out</button>
                </header>
            );
        }

    }
}

export default TopBar;