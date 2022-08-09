import React, { useState } from "react";
import { NavBar } from "../elements/navBar";
import { signUp } from "../elements/apiCalls";
import { sendVeriCode } from "../elements/apiCalls";
import crypto from "crypto-js";
import "./pageSignUp.css";
import { VeriCodeButton } from "../elements/veriCodeButton";
import { useTimer } from "react-timer-hook";
import Popup from "reactjs-popup";

const USED_EMAIL_SIGN = "USED_EMAIL";

export const PageSignUp = (props) => {
    const [form, updateForm] = useState(
        {
            email:"",
            passwd:"",
            confirmPasswd:"",
            veriCode:""
        }
    );
    const [popup_open, set_open] = useState(false);
    const [pop_string, set_pop_string] = useState("");
    const closePopUp = ()=>{set_open(false); set_pop_string("")};

    const [correctHashedVeriCode, setCorrectVeriCode] = useState("");
    const {restart} = 
        useTimer(
            {
                expiryTimestamp: new Date(), 
                onExpire: () => setCorrectVeriCode("")
            }
        );
    
    async function handleVeriCodeButton() {
        if(!form.email) {
            set_pop_string("Please enter email.");
            set_open(true);
            return false;
        }
        const returnedHashCode = await sendVeriCode(form.email);
        if(returnedHashCode===USED_EMAIL_SIGN) {
            // alert("Email cannot be used! Sign up failed!");
            //show a pop window to present information
            set_pop_string("Email has been used. Please use another email.");
            set_open(true);
                updateForm({
                    email:"",
                    passwd:"",
                    confirmPasswd:"",
                    veriCode:""
                });
            return false;
        }
        else {
            setCorrectVeriCode(returnedHashCode);
            return true;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const hashedInputVeriCode = crypto.SHA256(form.veriCode).toString();
        if(form.email && form.email !=="" 
            && correctHashedVeriCode=== hashedInputVeriCode
            && (form.passwd && form.confirmPasswd && form.passwd.length >= 6)
            && form.confirmPasswd===form.passwd
            ) {
            //sign up is async
            let signup_success = await signUp({userName:form.email, passwd:form.passwd})
            if(signup_success) {
                set_pop_string("Signed up successfully!");
                set_open(true);
                props.onPageChange("signIn");
                return;
            }
            else {
                set_pop_string("Email cannot be used! Sign up failed!");
                set_open(true);
                updateForm({
                    email:"",
                    passwd:"",
                    confirmPasswd:"",
                    veriCode:""
                });
            }
        }
        else if (!form.email) {
            set_pop_string("Please enter your email.");
            set_open(true);
        }
        else if (form.passwd === undefined || form.passwd===null || form.passwd.length < 6)  {
            set_pop_string("the length of password should be at least 6");
            set_open(true);
            updateForm({
                passwd:"",
                confirmPasswd:"",
                veriCode:""}
            );
        }
        else if(form.confirmPasswd!==form.passwd) {
            set_pop_string("Different password input");
            set_open(true);
            updateForm({
                
                passwd:"",
                confirmPasswd:"",
                veriCode:""}
            );
        }

        else if(form.veriCode === null ||
            form.veriCode ===undefined ||
            !correctHashedVeriCode ||
            correctHashedVeriCode!==form.veriCode){
            set_pop_string("Wrong verification code!");
            set_open(true);
            updateForm({veriCode:""});
        }

        else {
            alert("Unkown error");
        }
    };

    return (
        //todo: disable signup button until get hashed vericode
        <>

        <NavBar 
        logInStats={props.logInStats}
        onPageChange={props.onPageChange}
        onLogInChange={props.onLogInChange} />

        <Popup open={popup_open} closeOnDocumentClick onClose={closePopUp} className="infoPop">
            <div>
                {pop_string}
            </div>
        </Popup>
        <div className="singup-form-element">
            <form className="signUpForm" onSubmit={handleSubmit}>
            <div className="form-item">
                <label htmlFor="email-id" className="label-signup">Email</label>
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
                <label htmlFor="password-id" className="label-signup">Password</label>
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
                <label htmlFor="confirm-password-id" className="label-signup">Confirm Password</label>
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
                <label htmlFor="verification-id" className="label-signup">Verify Email</label>
                <input 
                type="txt" 
                name="Verify email"
                id="verification-id"
                className="signup-vericode"
                value={form.veriCode} 
                onChange={e => updateForm({
                    email: form.email,
                    passwd: form.passwd,
                    confirmPasswd: form.confirmPasswd,
                    veriCode: e.target.value
                })} />
        
                {/* <input type="button" 
                    value="Get Code" 
                    onClick={async () =>setCorrectVeriCode(await sendVeriCode(form.email))} 
                    className="get-verification-code-button" /> */}
                <VeriCodeButton 
                    click={handleVeriCodeButton}
                    startExpireTimer={restart}/>
            </div>
            <div className="form-item">
                <input 
                    disabled={!correctHashedVeriCode || correctHashedVeriCode==="" || correctHashedVeriCode=== USED_EMAIL_SIGN}
                    type="submit" 
                    value="Sign Up" 
                    className="sign-up-button"/>
            </div>
                
            </form>
        </div>        
        </>
    )
};
