import React, { useState } from "react";
import { NavBar } from "../elements/navBar";
import { signUp } from "../elements/apiCalls";
import { sendVeriCode } from "../elements/apiCalls";


export const PageSignUp = (props) => {
    const [form, updateForm] = useState(
        {
            userName:"",
            email:"",
            passwd:"",
            confirmPasswd:"",
            veriCode:""
        }
    );

    //eslint-disable-next-line
    const [correctVeriCode, setCorrectVeriCode] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        
        if(correctVeriCode===form.veriCode) {
            //sign up is async
            if(signUp({userName:form.userName, email: form.email, passwd:form.passwd})) {
                alert("signed up successfully!");
                return;
            }
            else {
                alert("Email cannot be used! Sign up failed!");
                form.updateForm({
                    userName:"",
                    email:"",
                    passwd:"",
                    confirmPasswd:"",
                    veriCode:""
                });
            }
        }
        else {
            alert("Wrong verification code!");
            form.updateForm({veriCode:""});
        }
    };

    return (
        /* TODO: Try to add a timer to the get code button */
        <>

        <NavBar 
        logInStats={props.logInStats}
        onPageChange={props.onPageChange}
        onLogInChange={props.onLogInChange} />

        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="user-name-id" className="label-user-name">User Name</label>
            <input 
            type="txt" 
            name="user name"
            id="user-name-id"
            value={form.userName} 
            onChange={e => updateForm({userName:e.target.value})} />
            
        </div>
        <div>
            <label htmlFor="email-id" className="label-email">Email</label>
            <input 
            type="email" 
            name="email"
            id="email-id"
            value={form.email} 
            onChange={e => updateForm({email:e.target.value})} />
        </div>
        <div>
            <label htmlFor="password-id" className="label-password">Password</label>
            <input 
            type="password" 
            name="password"
            id="password-id"
            value={form.passwd} 
            onChange={e => updateForm({passwd:e.target.value})} />
        </div>
            
        <div>
            <label htmlFor="confirm-password-id" className="label-confirm-password">Confirm Password</label>
            <input 
            type="password" 
            name="confirm password"
            id="cinfirm-password-id"
            value={form.confirmPasswd} 
            onChange={e => updateForm({confirmPasswd:e.target.value})} />
        </div>
            
        <div>
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
        <div>
            <input 
                type="submit" 
                value="Sign Up" 
                className="Sign-up-button"/>
        </div>
            
        </form>        
        </>
    )
};