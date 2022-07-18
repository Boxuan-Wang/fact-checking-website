import React, { useState } from "react";
import { NavBar } from "../elements/navBar";
import { signUp } from "../elements/apiCalls";
import { sendVeriCode } from "../elements/apiCalls";
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
    const [correctVeriCode, setCorrectVeriCode] = useState(0);

    async function handleSubmit(e) {
        e.preventDefault();
        alert("submit");
        
        if(correctVeriCode===parseInt(form.veriCode) && form.confirmPasswd===form.passwd) {
            //sign up is async
            let signup_success = await signUp({userName:form.email, passwd:form.passwd})
            if(signup_success) {
                alert("signed up successfully!");
                return;
            }
            else {
                alert("Email cannot be used! Sign up failed!");
                form.updateForm({
                    email:"",
                    passwd:"",
                    confirmPasswd:"",
                    veriCode:""
                });
            }
        }

        else if(form.confirmPasswd===form.passwd) {
            alert("Different password input");
            updateForm({
                userName:"",
                passwd:"",
                confirmPasswd:"",
                veriCode:""}
            );
        }
        else if (form.passwd.length<6) {
            alert("the length of password should be at least 6")
            updateForm({
                userName:"",
                passwd:"",
                confirmPasswd:"",
                veriCode:""}
            );
        }
        else if(correctVeriCode!==parseInt(form.veriCode)){
            alert("Wrong verification code!");
            updateForm({veriCode:""});
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
            <form onSubmit={handleSubmit}>
            <div className="form-item">
                <label htmlFor="email-id" className="label-email">Email</label>
                <input 
                type="email" 
                name="email"
                id="email-id"
                value={form.email} 
                onChange={e => updateForm({email:e.target.value})} />
            </div>
            <div className="form-item">
                <label htmlFor="password-id" className="label-password">Password</label>
                <input 
                type="password" 
                name="password"
                id="password-id"
                value={form.passwd} 
                onChange={e => updateForm({passwd:e.target.value})} />
            </div>
                
            <div className="form-item">
                <label htmlFor="confirm-password-id" className="label-confirm-password">Confirm Password</label>
                <input 
                type="password" 
                name="confirm password"
                id="cinfirm-password-id"
                value={form.confirmPasswd} 
                onChange={e => updateForm({confirmPasswd:e.target.value})} />
            </div>
                
            <div className="form-item">
                <label htmlFor="verification-id" className="label-verification">Verify Email</label>
                <input 
                type="txt" 
                name="Verify email"
                id="verification-id"
                value={form.veriCode} 
                onChange={e => updateForm({veriCode:e.target.value})} />
        
                <input type="button" 
                    value="Get Code" 
                    onClick={async () =>setCorrectVeriCode(sendVeriCode(form.email))} 
                    className="get-verification-code-button" />
            </div>
            <div className="form-item">
                <input 
                    type="submit" 
                    value="Sign Up" 
                    className="Sign-up-button"/>
            </div>
                
            </form>
        </div>        
        </>
    )
};