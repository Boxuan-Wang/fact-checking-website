import React from 'react';
import {ResultPresent} from './resultPresent.js';

/**
 * 
 * @returns A list of checked result represented in a short way
 */
export const PopularClaims = () => {
    // access the database to get the results to prsent
    // TODO: access database
    const results = [
      {field: 'Human will die.', score: 'True'},
    ];

    const listItems = results.map(
        (result) =>
          <li>
            <ResultPresent format="short" result={result}/>
          </li>,
    );

    return (
      <ul>{listItems}</ul>
    );
};

