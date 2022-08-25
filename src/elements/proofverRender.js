import React, { useEffect, useState } from 'react';
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

const renderSingleLogic = (claimWord, evidenceWord, operator,verdict) => {
    return (
        <div className='singleLogic'>
            <div> {claimWord}</div>
            <div> {operator} </div>
            <div> {evidenceWord}</div>
            <div> {verdict} </div>
        </div>
    );
};

export const produceVerdictSeq = (operators) => {
    //the verdicts: S, R, N (support, reject, NotAnInformation)
    const transistMap = new Map();
    transistMap.set('S#','S'); //what to do with #?
    transistMap.set('S<','S');
    transistMap.set('S=','S');
    transistMap.set('S|','R');
    transistMap.set('S!','R');
    transistMap.set('S>','N');

    transistMap.set('R=','R');
    transistMap.set('R>','R');
    transistMap.set('R!','S');
    transistMap.set('R|','N');
    transistMap.set('R<','N');
    transistMap.set('R#','R');
    
    transistMap.set('N=','N');
    transistMap.set('N<','N');
    transistMap.set('N>','N');
    transistMap.set('N|','N');
    transistMap.set('N!','N');
    transistMap.set('N#','N');

    let state = 'S';
    let retSeq = "";
    for(let op of operators) {;
        state = transistMap.get(state + op);
        retSeq += state;
    }
    return retSeq;
};

const detailVerdict = (v) => {
    switch(v) {
        case 'S': return "SUPPORT";
        case 'R': return "REJECT";
        case 'N': return "NOT INFORMATION";
        default: throw new Error('Unknown verdict');

    }
};

const renderFromProofElements = (claim, evidence, operator) => {
    if(claim.length !== evidence.length || evidence.length !== operator.length) {
        throw new Error("Proof format error: length not the same");
    }

    let ret = [];
    ret.push(
        <div className='proofverCol'> 
            <div>Claim</div>
            <div>Relation</div>
            <div>Evidence</div>
            <div>Verdict</div>
        </div>
        );
    const len = claim.length;
    const verdictSeq = produceVerdictSeq(operator);
    for(let i = 0; i < len; i++) {
        ret.push(renderSingleLogic(claim[i],evidence[i],operator[i],detailVerdict(verdictSeq[i])));
    }

    return ret;
};



export const RenderProofString = (props) => {
    //used for displaying part of proof, for animation
    const [step, setStep] = useState(1);
    const [play, setPlay] = useState(false);

    console.log(play);
    const elements = extract(props.proof);
    // const verdict = props.verdict;
    // const verdictSeq = produceVerdictSeq(elements.operators);
    const proof = renderFromProofElements(elements.claim, elements.evidence, elements.operators);
    const maxStage = proof.length;
    const pauseTimer = () => {setPlay(false)};
    const startTimer = () => {setPlay(true)};

    

    useEffect(() => {
        if(play) {
            if(step >= maxStage) {
                setPlay(false);
            }
            else {
                setTimeout(() =>  {                
                    setStep( step + 1);
                    startTimer();
                },
                500);
            }
        }
    });

    //display only the 'step' number of elements
    return (
        <>
        <div className='proofverText'>
             {proof.slice(0, step)}
        </div>
        <div className='proofverPlayButtonsRow'>
            <button className='proofverButton' onClick={ play ? pauseTimer : startTimer }>{play? "Pause": "Play"}</button>
            <button className='proofverButton' onClick={() => {setStep(1);}}>Rewind</button>
        </div>
        
    </>
    )
};
