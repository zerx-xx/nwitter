import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import {authService} from "../firebase" ;

const App = () => {
  const [init, setInit] = useState(false) ;
  const [userObj, setUserObj] = useState(null) ; 


  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        if(user.displayName === null) {
          user.updateProfile({
            displayName:"None",
          })
        }
        setUserObj({
          displayName: user.displayName,
          uid: user.uid, 
          updateProfile: (args) => user.updateProfile(args),
        }) ; 
      } else {
        setUserObj(null) ; 
      }
      setInit(true) ; 
    })
  }, []) ;

  const refreshUser = () => {
    const user = authService.currentUser ; 
    setUserObj({
      displayName: user.displayName,
      uid: user.uid, 
      updateProfile: (args) => user.updateProfile(args), 
    }) ; 
  } ;

  return (
    <>
    {init ? <AppRouter isLoggedIn = {Boolean(userObj)} 
                       userObj={userObj} 
                       refreshUser={refreshUser}/> 
                       : "Initializing..."}
    </>
  );
}

export default App;
 