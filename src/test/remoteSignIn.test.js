import React from 'react';
import {act} from 'react-dom/test-utils';
import { getPopular, checkClaim, signIn, signUp, sendVeriCode, deleteUser } from '../elements/apiCalls';

const serverUrl = "http://127.0.0.1:5000";

beforeAll(async () => {
    const userInfo = {
        userName: "testremote@test.com",
        passwd:"testremote"
    };
    let res = await signUp(userInfo);
    if(!res) throw new Error("Cannot create test account: " + userInfo.userName);
});

afterAll(async () => {
    const userInfo = {
        userName: "testremote@test.com",
        passwd:"testremote"
    };
    let res = await deleteUser(userInfo);
    if(!res) throw new Error("Cannot delete test account: " + userInfo.userName);
});

test ('test remote sign in success', async () => {
    const userInfo = {
        userName: "testremote@test.com",
        passwd:"testremote"
    };

    let result;
    await act(async () => result = await signIn(userInfo));
    expect(result).toBe(true);
});

test ('test remote sign in fail with wrong password', async () => {
    const wrongUserInfo = {
        userName: "testremote@test.com",
        passwd:"wrongtestremote"
    };

    let result;
    await act(async () => result = await signIn(wrongUserInfo));
    expect(result).toBe(false);
});

test('test remote sign in fail with unknown user', async () => {
    const wrongUserInfo = {
        userName: "wrongtestremote@test.com",
        passwd:"testremote"
    };

    let result;
    await act(async () => result = await signIn(wrongUserInfo));
    expect(result).toBe(false);
});
