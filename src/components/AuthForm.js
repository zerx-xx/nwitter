import React, { useState } from "react";
import { authService } from "../firebase";
import "/Users/drizzle/nwitter/src/css/auth.modul.css"

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
            <div className="authDiv">
                <h1 className="headerwrite"> 로그인 & 회원가입을 진행하세요. </h1>
                <form className="authForm"
                    onSubmit={onSubmit}>
                    <input className="inputEmail"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required />
                    <input className="inputPassword"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required />
                    <span className="authToggle"
                            onClick={toggleAccount}> 
                            {newAccount ? "Log In" : "New Account"} 
                    </span>
                    <input className="inputSubmit"
                            type="submit"
                            value={newAccount ? "New Account" : "Log In"} />
                    {error}
                </form>

                            

            </div>
        </>
    )
}

export default AuthForm ; 