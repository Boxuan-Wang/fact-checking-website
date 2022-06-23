import React from 'react';

export const ResultPresent = (props) => {
  // require fields: format of representing, result (with field claim, score, ...)
    if (props.format==='short') {
      // format used in main page
      return (
        <><p className="shortPreClaim">{props.result.field}</p><p className="shortPreScore">{props.result.score}</p></>
      );
    } else throw new Error('Not a format for result representing.');
};
