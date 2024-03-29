import React from 'react';
import "./resultPresent.css";
import { RenderProofString } from "./proofverRender";

export const ResultPresent = (props) => {
  let ret;
  // require fields: format of representing, result
    if (props.format==='short') {
      // format used in main page

      ret = <><div className="shortPreClaim">{props.result.claim}</div></>;

    }
    else if(props.format === 'history') {
      const date = new Date(props.result.date);
      
      ret = 
      <>
      <div>
        <div className='historyClaimText'>{props.result.claim}</div>
        <div className='historyClaimDate'>{date.toUTCString()}</div>
      </div>
      </>
    }
    else if (props.format === 'short_human_result') {
      //format used to show human result in short

      let date = new Date(props.result.publication_date);
      ret = 
        <>
          <a href={props.result.claim_url} target='_blank' rel='noopener noreferrer' className='short_human_result'>
            <div className='short_claim_text'>{props.result.claim_text}</div>
            <div className='short_claim_org'>{"From:   "+props.result.claim_org}</div>
            <div className='short_claim_date'>{date.toDateString()}</div>
          </a>
        </>
    }
    else if(props.format === "long_human_result") {
      //format used to show human result in a full format
      ret = 
      <>
        <div className='short_human_result'>
          <div>{props.result.claim_text}</div>
          <div>{props.result.claim_org}</div>
          <div>{props.result.publication_date}</div>
          <div>{props.result.claim_url}</div>
          <div>{props.result.text}</div>
          <div>{props.result.publication}</div>
        </div>
      </>
    }
    else if (props.format === "proofver_result"){
      if(props.result.output && props.result.evidence) {
        ret = 
        <>
          <RenderProofString result={props.result}/>
        </>
      }
      else {
        ret = <>
          <div className='noCheckingEngine'>No checking engine connected</div>
        </>
      }

      
    }
    else throw new Error('Not a format for result representing.');

    return ret;
};
