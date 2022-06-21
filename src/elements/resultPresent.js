import React from "react";

class ResultPresent extends React.Component {

    //require fields: format of representing, result (with field claim, score, ...)
    render() {
        if (this.props.format==="short"){
            //format used in main page
            return (
                <><p className="shortPreClaim">{this.props.result.field}</p><p className="shortPreScore">{this.props.result.score}</p></>
            );
        }
        else throw new Error("Not a format for result representing.")
    }
}

export default {ResultPresent};