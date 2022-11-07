import React from "react";
import AuthForm from "../components/AuthForm";
import { authService, firebaseInstance } from "../firebase";

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
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google"> Confinue with Google </button>
            </div>
        </div>
    )
}
export default Auth ; 