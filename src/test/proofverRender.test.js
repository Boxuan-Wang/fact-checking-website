import {act} from 'react-dom/test-utils';
import { extract } from "../elements/proofverRender";

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



