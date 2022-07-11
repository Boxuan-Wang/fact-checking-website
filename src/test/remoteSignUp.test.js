import React from 'react';
import {act} from 'react-dom/test-utils';
import { getPopular, checkClaim, signIn, signUp, sendVeriCode, deleteUser } from '../elements/apiCalls';

const serverUrl = "http://127.0.0.1:5000";

beforeEach(async () => {
    const userInfo = {
        userName: "testremote@test.com",
        passwd:"testremote"
    };
    let res = await signUp(userInfo);
    if(!res) throw new Error("Cannot create test account: " + userInfo.userName);
});

afterEach(async () => {
    const userInfo = {
        userName: "testremote@test.com",
        passwd:"testremote"
    };
    let res = await deleteUser(userInfo.userName);
    if(!res) throw new Error("Cannot delete test account: " + userInfo.userName);
});

test('test remote sign up success', async () => {
    const userInfo = {
        userName: "testsignupremote@test.com",
        passwd:"testremote"
    };

    let result;
    let del_succ;
    await act(async () => {
        result = await signUp(userInfo);
        del_succ = await deleteUser(userInfo.userName);
    });
    expect(result).toBe(true);
    expect(del_succ).toBe(true);
});

test('test remote sign up fail with used email', async () => {
    const userInfo = {
        userName: "testremote@test.com",
        passwd:"testremote"
    };

    let result;
    await act(async () => result = await signUp(userInfo));
    expect(result).toBe(false);
});
