import React from "react";
import { authService, firebaseInstance } from "../firebase";
import googlelogo from "../imag/google-logo.png" ;
import "/Users/drizzle/nwitter/src/css/account.modul.css"


const Auth = () => {
    const onSocialClick = async (event) => {
        const {target: {name}} = event ;
        let provider ; 
        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        } ; 
        const data = await authService.signInWithPopup(provider) ; 
    } ; 

    return (
        <div>
            <button className="googlebutton" onClick={onSocialClick} name="google" > <img className="googlelogo" src={googlelogo} width="16" height="16"  /> Continue with Google </button>
        </div>
    )
}
export default Auth ; 