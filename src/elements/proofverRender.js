import React from 'react';

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
const renderProof = (claim, proof, operater) => {
    return <div></div>;
}