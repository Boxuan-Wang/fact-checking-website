import React, { useState } from "react";
import { NavBar } from "../elements/navBar";
import { signIn } from "../elements/apiCalls";
import "./pageSignIn.css";

/**
 * Page where users sign in.
 * @param {a structure including logInStats, and other handler functions} props 
 * @returns sign-in page, input boxes
 */
export const PageSignIn = (props) => {

    const [form,updateForm] = useState({
        userName:"",
        passwd:""
    });

    async function handleSubmit(e) {
        e.preventDefault();
        
        if(await signIn(form)) {
            //todo: change to cookie version
            props.onLogInChange({log: true, userName: form.userName}, JSON.stringify(form));
            alert("Log in successfully!");
            props.onPageChange("main");
        }
        else {
            alert("Fail to log in!");
            updateForm({
                userName:"",
                passwd:""
            });
        }
    };

    return (
        <>
        <NavBar 
        logInStats={props.logInStats}
        onPageChange={props.onPageChange}
        onLogInChange={props.onLogInChange} />
        <form className="signInForm" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="userName-id" className="label-signIn">User Name</label>
            <input 
                type={"email"} 
                value={form.userName}
                id="userName-id"
                className="signInInput"
                onChange={e => updateForm({
                    userName: e.target.value,
                    passwd: form.passwd
                })} />
        </div>
        <div>
            <label htmlFor="password-id" className="label-singIn">Password</label>
            <input 
                type="password" 
                value={form.passwd}
                id="password-id"
                className="signInInput"
                onChange={e => updateForm({
                    userName:form.userName,
                    passwd:e.target.value
                })} />
        </div>
            
        <div>
            <input type="submit" value="Sign In" className="sign-in-button"/>
        </div>
            
        </form>
        </>
       
    );
};