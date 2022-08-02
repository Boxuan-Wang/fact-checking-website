import React, { useState } from "react";
import { NavBar } from "../elements/navBar";
import { signUp } from "../elements/apiCalls";
import { sendVeriCode } from "../elements/apiCalls";
import crypto from "crypto-js";
import "./pageSignUp.css";

export const PageSignUp = (props) => {
    const [form, updateForm] = useState(
        {
            email:"",
            passwd:"",
            confirmPasswd:"",
            veriCode:""
        }
    );

    //eslint-disable-next-line
    const [correctHashedVeriCode, setCorrectVeriCode] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const hashedInputVeriCode = crypto.SHA256(form.veriCode).toString();
        if(correctHashedVeriCode=== hashedInputVeriCode
            && (form.passwd && form.confirmPasswd && form.passwd.length >= 6)
            && form.confirmPasswd===form.passwd
            ) {
            //sign up is async
            let signup_success = await signUp({userName:form.email, passwd:form.passwd})
            if(signup_success) {
                alert("signed up successfully!");
                return;
            }
            else {
                alert("Email cannot be used! Sign up failed!");
                updateForm({
                    email:"",
                    passwd:"",
                    confirmPasswd:"",
                    veriCode:""
                });
            }
        }
        else if (form.passwd === undefined || form.passwd===null || form.passwd.length < 6)  {
            alert("the length of password should be at least 6")
            updateForm({
                passwd:"",
                confirmPasswd:"",
                veriCode:""}
            );
        }
        else if(form.confirmPasswd!==form.passwd) {
            alert("Different password input");
            updateForm({
                passwd:"",
                confirmPasswd:"",
                veriCode:""}
            );
        }

        else if(correctHashedVeriCode!==form.veriCode){
            alert("Wrong verification code!");
            updateForm({veriCode:""});
        }

        else {
            alert("Unkown error");
        }
    };

    return (
        /* TODO: Try to add a timer to the get code button */
        <>

        <NavBar 
        logInStats={props.logInStats}
        onPageChange={props.onPageChange}
        onLogInChange={props.onLogInChange} />

        <div className="form-element">
            <form className="signUpForm" onSubmit={handleSubmit}>
            <div className="form-item">
                <label htmlFor="email-id" className="label-email">Email</label>
                <input 
                type="email" 
                name="email"
                id="email-id"
                className="signup-text"
                value={form.email} 
                onChange={e => updateForm({
                    email: e.target.value,
                    passwd: form.passwd,
                    confirmPasswd: form.confirmPasswd,
                    veriCode: form.veriCode
                })} />
            </div>
            <div className="form-item">
                <label htmlFor="password-id" className="label-password">Password</label>
                <input 
                type="password" 
                name="password"
                id="password-id"
                className="signup-text"
                value={form.passwd} 
                onChange={e => updateForm({
                    email: form.email,
                    passwd: e.target.value,
                    confirmPasswd: form.confirmPasswd,
                    veriCode: form.veriCode
                })} />
            </div>
                
            <div className="form-item">
                <label htmlFor="confirm-password-id" className="label-confirm-password">Confirm Password</label>
                <input 
                type="password" 
                name="confirm password"
                id="cinfirm-password-id"
                className="signup-text"
                value={form.confirmPasswd} 
                onChange={e => updateForm({
                    email: form.email,
                    passwd: form.passwd,
                    confirmPasswd: e.target.value,
                    veriCode: form.veriCode
                })} />
            </div>
                
            <div className="form-item">
                <label htmlFor="verification-id" className="label-verification">Verify Email</label>
                <input 
                type="txt" 
                name="Verify email"
                id="verification-id"
                className="signup-text"
                value={form.veriCode} 
                onChange={e => updateForm({
                    email: form.email,
                    passwd: form.passwd,
                    confirmPasswd: form.confirmPasswd,
                    veriCode: e.target.value
                })} />
        
                <input type="button" 
                    value="Get Code" 
                    onClick={async () =>setCorrectVeriCode(await sendVeriCode(form.email))} 
                    className="get-verification-code-button" />
            </div>
            <div className="form-item">
                <input 
                    type="submit" 
                    value="Sign Up" 
                    className="sign-up-button"/>
            </div>
                
            </form>
        </div>        
        </>
    )
};