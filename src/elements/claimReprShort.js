import React from "react";

/**
 * The element is used to represent a fact-checking result in a short way.
 * To display popular ones at the main page.
 */
class ClaimReprShort extends React.Component {
//the constructor needs field: result (a class)

    render() {
        return (
            <>
            <p className="claimContent">{this.props.result.content}</p>
            <p className="score">{this.props.result.score}</p>
            </>
        );
    }
}