import React from 'react';
import {render, screen} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import { PageChecked } from '../pages/pageChecked';



test('test popular checked page', async () => {
    const fakeClaimList = [
        {claim: 'Human will die.', score: true},
        {claim: 'Human will not die.', score: false},
    ];

    jest.spyOn(global,'fetch').mockImplementation(() => 
        Promise.resolve({
            json: () => Promise.resolve(fakeClaimList),
        })
    );

    await act(async () => 
        render(<PageChecked logInStats={{log: false, userName: undefined}}/>
    ));
    let linkElement= screen.getByText(/Human/i);
    // setTimeout(() => linkElement = screen.getByText(/Human/i),500);
    expect(linkElement).toBeInTheDocument();

    global.fetch.mockRestore();
},5000);