import React, { useState } from "react";
import { NavBar } from "../elements/navBar";
import { signIn } from "../elements/apiCalls";
import "./pageSignIn.css";
import Popup from "reactjs-popup";

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
    const [popOpen, setPopOpen] = useState(false);
    const [popString, setPopString] = useState("");
    const [signinSuccess, setSigninSuccess] = useState(false);
    const closePopUp = 
        () => {
            setPopOpen(false); 
            setPopString("");
            if(signinSuccess){
                props.onPageChange("main");
            }
        };

    async function handleSubmit(e) {
        e.preventDefault();
        
        if(await signIn(form)) {
            //todo: change to cookie version
            props.onLogInChange({log: true, userName: form.userName}, JSON.stringify(form));
            setPopString(`Welcome, user<${form.userName}>.`);
            setPopOpen(true);
            setSigninSuccess(true);
        }
        else {
            setPopString(`Wrong password or username.`);
            setPopOpen(true)
            updateForm({
                userName:"",
                passwd:""
            });
            setSigninSuccess(false);
        }
    };

    return (
        <>
        <NavBar 
        logInStats={props.logInStats}
        onPageChange={props.onPageChange}
        onLogInChange={props.onLogInChange} />
        <Popup open={popOpen} closeOnDocumentClick onClose={closePopUp} className="infoPop">
            <div>
                {popString}
            </div>
        </Popup>
        <div className="signin-form-element">
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
                    <label htmlFor="password-id" className="label-signIn">Password</label>
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

        </div>
       
        </>
       
    );
};