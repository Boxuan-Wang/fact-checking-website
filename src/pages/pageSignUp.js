import React, { useState } from "react";
import { TopBar } from "../elements/topbar";
import { signUp } from "../elements/apiCalls";
import { sendVeriCode } from "../elements/apiCalls";


export const PageSignUp = (props) => {
    const [userName,setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    const [confirmPasswd, setConfirmPasswd] = useState("");
    const [veriCode, setVeriCode] = useState("");
    //eslint-disable-next-line
    const [correctVeriCode, setCorrectVeriCode] = useState("");

    function trySignUp() {
        if(correctVeriCode===veriCode) {
            if(signUp({userName:userName, email: email, passwd:passwd})) {
                alert({userName} + "signed up successfully!");
                // props.onPageChange("main");
                return;
            }
            else {
                alert("Email cannot be used! Sign up failed!");
                setUserName("");
                setEmail("");
                setConfirmPasswd("");
                setPasswd("");
                setVeriCode("");
            }
        }
        else {
            alert("Wrong verification code!");
            setVeriCode("");
        }
    };

    return (
        /* TODO: Try to add a timer to the get code button */
        <>
        <TopBar 
        logInStats={props.logInStats}
        onPageChange={props.onPageChange}
        onLogInChange={props.onLogInChange} />
        
        <input 
        type="txt" 
        name="user name"
        value={userName} 
        onChange={e => setUserName(e.target.value)} />
        <input 
        type="txt" 
        name="email"
        value={email} 
        onChange={e => setEmail(e.target.value)} />
        <input 
        type="txt" 
        name="password"
        value={passwd} 
        onChange={e => setPasswd(e.target.value)} />
        <input 
        type="txt" 
        name="confirm password"
        value={confirmPasswd} 
        onChange={e => setConfirmPasswd(e.target.value)} />
        <input 
        type="txt" 
        name="Verify email"
        value={veriCode} 
        onChange={e => setVeriCode(e.target.value)} />
        
        <button onClick={() => setCorrectVeriCode(sendVeriCode(email))}>Get Code</button>
        <button onClick={() => trySignUp()}>Sign Up</button>
                
        </>
    )
};