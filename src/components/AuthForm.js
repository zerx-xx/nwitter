import React, { useState } from "react";
import { authService } from "../firebase";

const AuthForm = () => {
    const [email, setEmail] = useState("") ;
    const [password, setPassword] = useState("") ; 
    const [newAccount, setNewAccount] = useState(false) ; 
    const [error, setError] = useState("") ;

    const onChange = (event) => {
        const {target: {name, value}} = event ;
        if (name === "email") {
            setEmail(value) ;
        } else if (name === "password") {
            setPassword(value) ; 
        }
    } ; 

    const onSubmit = async (event) => {
        event.preventDefault() ; 
        try {
        let data ; 
            if (newAccount) {
                const data = await authService.createUserWithEmailAndPassword(email, password) ;
            } else {
                const data = await authService.signInWithEmailAndPassword(email, password) ; 
            }
        } catch (error) {
            setError(error.message);
        }
    } ; 

    const toggleAccount = () => setNewAccount((prev) => !prev) ;
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="email"
                       placeholder="Email"
                       name="email"
                       value={email}
                       onChange={onChange}
                       required />
                <input type="password"
                       placeholder="Password"
                       name="password"
                       value={password}
                       onChange={onChange}
                       required />
                <input type="submit"
                       value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}> 
                {newAccount ? "Log In" : "Create Account"}
            </span>
        </>
    )
}

export default AuthForm ; 