import React from 'react';
import { ResultPresent } from './resultPresent.js';
import { getPopular } from './apiCalls.js';

/**
 * A list that contains some popular results. 
 * @returns A list of checked result represented in a short way
 */
export const PopularClaims = () => {

    const listItems = getPopular().map(
        (result) =>
          <li>
            <ResultPresent format="short" result={result}/>
          </li>,
    );

    return (
      <ul>{listItems}</ul>
    );
};
