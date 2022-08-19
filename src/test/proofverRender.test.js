import {act} from 'react-dom/test-utils';
import React from 'react';
import { extract,RenderProofString } from "../elements/proofverRender";

test('test ProofVer normal', () => {
    let res;
    const input = "^ { First president } [ first president ] = \
    { of USA } [ of USA ] = \
    { is Washington. } \
    [ Washington elected ] <";

    act(() => res = extract(input));
    expect(res.claim).toEqual(["First president", "of USA", "is Washington."]);
    expect(res.evidence).toEqual(["first president", "of USA", "Washington elected"]);
    expect(res.operators).toEqual(['=','=','<']);
});

test('test proofver extract with evidence only', () => {
    let res;
    const input = "^ [evidence  ] [evi]";
    act(() => res = extract(input));
    expect(res.evidence).toEqual(["evidence","evi"]);
});

// test('render proof test', () => {
//     const input = "^ { claim } [ evidence ] = ";
//     let res;
//     act(() => res = renderProofString(input));
//     expect(res).toBe(<div className="proofverResult"><div className="singleLogic"><div> claim</div><div> evidence</div><div> = </div></div></div>);
// });

