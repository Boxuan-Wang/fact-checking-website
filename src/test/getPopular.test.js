import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import { getPopular } from '../elements/apiCalls';

let container = null;

beforeEach(() => {
    container = null;
});

afterEach(() => {
    container = null;
});

it('test getPopular API function', async () => {
    const fakeClaimList = [
        {claim: 'Human will die.', score: true},
        {claim: 'Human will not die.', score: false},
    ];

    jest.spyOn(global,'fetch').mockImplementation(() => 
    Promise.resolve({
        json: () => Promise.resolve(fakeClaimList),
    }));

    await act(async () =>  container = await getPopular());
    expect(container[0].claim).toBe('Human will die.');
    expect(container[1].score).toBe(false);

   
    global.fetch.mockRestore();
});

