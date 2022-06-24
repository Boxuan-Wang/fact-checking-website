import React, { useState } from "react";
import { TopBar } from "../elements/topbar";
import { signIn } from "../elements/apiCalls";



/**
 * Page where users sign in.
 * @param {a structure including logInStats, and other handler functions} props 
 * @returns sign-in page, input boxes
 */
export const PageSignIn = (props) => {
    const [userName, setUserName] = useState("User name / Email");
    const [passwd, setPasswd] = useState("Password");

    function trySignIn(userInfo) {
        if(signIn(userInfo)) {
            props.onLogInChange({log: true, userName: userInfo.userName});
            alert("Log in successfully!");
            props.onPageChange("main");
        }
        else {
            alert("Fail to log in!");
            setUserName("User name / Email");
            setPasswd("Password");
        }
    };

    return (
        <>
        <TopBar 
        logInStats={props.logInStats}
        onPageChange={props.onPageChange}
        onLogInChange={props.onLogInChange} />
        <input type="txt" value={userName} onChange={e => setUserName(e.target.value)} />
        <input type="txt" value={passwd} onChange={e => setPasswd(e.target.value)} />
        <button onClick={() => trySignIn({userName:userName, passwd:passwd})}>Sign In</button>
        </>
       
    );
};