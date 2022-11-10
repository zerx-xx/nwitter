import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Account from "../routes/Account";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import AuthForm from "./AuthForm";
import Navigation from "./Navigation";

const AppRouter = ({refreshUser, isLoggedIn, userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ? 
                <>

                <Route exact path="/">
                    <Home userObj={userObj} />
                </Route>
                <Route exact path="/profile">
                    <Profile userObj={userObj} refreshUser={refreshUser} />
                </Route>


                <Redirect from="*" to="/" />

                </> : <>

                <Route exact path="/">
                    <Account />
                </Route>
                <Redirect from="*" to="/" />

                <Route exact path="/authform">
                    <AuthForm userObj={userObj} />
                </Route>

                <Redirect from="*" to="/" />

                </>}
            </Switch>
        </Router>
    ) 
}

export default AppRouter ; 
