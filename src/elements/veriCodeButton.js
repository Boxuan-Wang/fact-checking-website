import React, { useState } from "react";
import { useTimer } from "react-timer-hook";
import "./veriCodeButton.css";

export const VeriCodeButton = (props) => {
    //false means that the button was not clicked in recent one minite
    const [clickedState, setClickState] = useState(false);
    let ret;
    const initialTime = new Date();
    const {
            seconds,
            minutes,
            restart,
        } = useTimer(
            {
                initialTime,
                onExpire: () => setClickState(false)
            }
        );
    async function clickGetCode() {
        //store the return value into the hook
        await props.click();
        //start the expire timer
        let expireTime = new Date();
        expireTime.setMinutes(expireTime.getMinutes() + 10);
        props.startExpireTimer(expireTime)
        //wait for two minutes, button becomes invalid
        const time = new Date();
        
        time.setSeconds(time.getSeconds() + 120);
        setClickState(true);
        restart(time);

    }
    if(!clickedState) {
        ret = <input
            type="button" 
            value="Get code"
            onClick={clickGetCode}
            className="unclickedSendVeriButton"/>;
    }
    else {
        ret = <input
            type="button" 
            value={`resend in ${seconds + 60 * minutes}s`}
            disabled={true}
            className="clickedSendVeriButton"/>;
    }
    return ret;
};
