import React from "react";
import {TopBar} from "../elements/topbar.js"

class pageMain extends React.Component {
    render() {
        return (
            <>
            <TopBar logIn={this.props.logIn} />
            <div className="heading">
                <h1>Auto Fact Checking</h1>
                <p>Enter any claim you can think of. 
                Let AI find some evidence and 
                justify that for you.</p>
                <button >Make A Claim</button> 
            </div>
            <div className="popularClaims">
                <h2>Popular Checked Claims</h2>
                <PopularClaims />
            </div>
            </>
        );
    }
}

export default pageMain;