import React from 'react';
import {act} from 'react-dom/test-utils';
import { getPopular, checkClaim, signIn, signUp, sendVeriCode, getHistory } from '../elements/apiCalls';

test('test getHistory API function', async () => {
    let container;
    const fakeHistoryList = {history: [
        {claim: "History1", date: 123456789},
        {claim: "History2", date: 123456789},
    ]};

    jest.spyOn(global, 'fetch').mockImplementation(() => 
    Promise.resolve({
        json: () => Promise.resolve(fakeHistoryList)
    }));

    await act(async () => container = await getHistory("user"));
    expect(container[0].claim).toBe("History1");
    expect(container[0].date).toBe(123456789);
});

test('test getPopular API function', async () => {
    let container;
    const fakeClaimList = [
        {claim: 'Human will die.', score: true},
        {claim: 'Human will not die.', score: false},
    ];

    jest.spyOn(global,'fetch').mockImplementation(() => 
        Promise.resolve({
            json: () => Promise.resolve(fakeClaimList),
        })
    );

    await act(async () =>  container = await getPopular());
    expect(container[0].claim).toBe('Human will die.');
    expect(container[1].score).toBe(false);

   
    global.fetch.mockRestore();
});

test('test check claim API function', async () => {
    let container;
    const fakeCheckResult = {
        claim:"Given claim content",
        score: true
    };

    jest.spyOn(global,'fetch').mockImplementation(() => 
        Promise.resolve({
            json: () => Promise.resolve(fakeCheckResult),
        })
    );

    await act(async () => container = await checkClaim(""));
    expect(container.score).toBe(true);
    expect(container.claim).toBe("Given claim content");

    global.fetch.mockRestore();
});

test('test signIn API return true', async () => {
    let result;
    const fakeSignInResult = true;

    jest.spyOn(global,'fetch').mockImplementation(() => 
        Promise.resolve({
            json: () => Promise.resolve(fakeSignInResult),
        })
    );

    await act(async () => result = await signIn(""));
    expect(result).toBe(true);

    global.fetch.mockRestore();
});

test('test signIn API return false', async () => {
    let result;
    const fakeSignInResult = false;

    jest.spyOn(global,'fetch').mockImplementation(() => 
        Promise.resolve({
            json: () => Promise.resolve(fakeSignInResult),
        })
    );

    
    await act(async () => result = await signIn(""));
    expect(result).toBe(false);

    global.fetch.mockRestore();
});

test('test signUp API return false', async () => {
    let result;
    const fakeSignInResult = false;

    jest.spyOn(global,'fetch').mockImplementation(() => 
        Promise.resolve({
            json: () => Promise.resolve(fakeSignInResult),
        })
    );

    const userInfo = {
        userName: "testlocal@test.com",
        passwd:"test"
    };
    await act(async () => result = await signUp(userInfo));
    expect(result).toBe(false);

    global.fetch.mockRestore();
});

test('test signUp API return true', async () => {
    let result;
    const fakeSignInResult = true;

    jest.spyOn(global,'fetch').mockImplementation(() => 
        Promise.resolve({
            json: () => Promise.resolve(fakeSignInResult),
        })
    );

    
    const userInfo = {
        userName: "testlocal@test.com",
        passwd:"test"
    };
    await act(async () => result = await signUp(userInfo));
    expect(result).toBe(true);

    global.fetch.mockRestore();
});

test('test sendVeriCod API', async () => {
    let result;
    const fakeCode = "1234";

    jest.spyOn(global,'fetch').mockImplementation(() => 
        Promise.resolve({
            json: () => Promise.resolve({veriCode:fakeCode}),
        })
    );

    await act(async () => result = await sendVeriCode({email:"123@example.com"}));
    expect(result).toBe(fakeCode);

    global.fetch.mockRestore();
});
