import React from 'react';
import "./proofver.css";
/**
 * Extract claim words, evidence words and natural logic operators
 */
export const extract = (resultText) => {
    const operatorSet = new Set(['=','<','!','|','>','#']);
    const len = resultText.length;
    let claimList = [];
    let evidenceList = [];
    let operatorList = [];

    for (let i = 0; i < len; i++) {
        if(resultText[i] === '{') {
            //start of claim
            const claimStart = i;
            do {
                i++;
            } while(resultText[i] !== '}');
            const claimEnd = i;
            claimList.push(resultText.substring(claimStart+1, claimEnd).trim());
        }
        else if(resultText[i] === '[') {
            //start of evidence
            const evidenceStart = i;
            do {
                i++;
            } while(resultText[i] !== ']');
            const evidenceEnd = i;
            evidenceList.push(resultText.substring(evidenceStart+1, evidenceEnd).trim());            
        }
        else if (operatorSet.has(resultText[i])){
            operatorList.push(resultText[i]);
        }
        else {
            continue;
        }
    }
    return {
        claim:claimList,
        evidence: evidenceList,
        operators:operatorList
    };
}

const renderSingleLogic = (claimWord, evidenceWord, operator) => {
    return (
        <div className='singleLogic'>
            <div> {claimWord}</div>
            <div> {operator} </div>
            <div> {evidenceWord}</div>
        </div>
    );
};


const renderFromElements = (claim, evidence, operator) => {
    if(claim.length !== evidence.length || evidence.length !== operator.length) {
        throw new Error("Proof format error: length not the same");
    }

    let ret = [];
    ret.push(
        <div className='singleLogic'> 
            <div>Claim</div>
            <div>Relation</div>
            <div>Evidence</div>
        </div>
        );
    const len = claim.length;
    for(let i = 0; i < len; i++) {
        ret.push(renderSingleLogic(claim[i],evidence[i],operator[i]));
    }


    return (
        <div className='proofverResult'>
            {ret}
        </div>
    );
};

export const RenderProofString = (props) => {
    const elements = extract(props.proof);
    return renderFromElements(elements.claim, elements.evidence, elements.operators);
};
