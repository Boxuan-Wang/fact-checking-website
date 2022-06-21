import React from "react";
import {ResultPresent} from "./resultPresent";

class PopularClaims extends React.Component {
    //for the constructor, need field: results (as an array of checked result)
    
    render() {
        const listItems = this.props.results.map(
            (result) => 
            <li>
                <ResultPresent format="short" content={result}/> 
            </li>
        );

        return (
            <ul>{listItems}</ul>
        );
    }
}