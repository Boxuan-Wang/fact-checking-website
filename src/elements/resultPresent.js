import React from 'react';

export const ResultPresent = (props) => {
  // require fields: format of representing, result
    if (props.format==='short') {
      // format used in main page
      return (
        <><div className="shortPreClaim">{props.result.claim}</div></>
      );
    } else throw new Error('Not a format for result representing.');
};
