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
                updateForm({
                    userName:"",
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
            type="txt" 
            name="password"
            id="password-id"
            value={form.passwd} 
            onChange={e => updateForm({passwd:e.target.value})} />
        </div>
            
        <div>
            <label htmlFor="confirm-password-id" className="label-confirm-password">Confirm Password</label>
            <input 
            type="txt" 
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
                onClick={async () =>setCorrectVeriCode(parseInt(await sendVeriCode(form.email)))} 
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