import React, { useEffect, useState } from "react";
import { authService, dbService } from "../firebase";
import "/Users/drizzle/nwitter/src/css/reset.css"
import "/Users/drizzle/nwitter/src/css/profile.modul.css"

const ProfileEdit = ({refreshUser, userObj}) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName) ; 

    const onChange = (event) => {
        const {target: {value}} = event ; 
        setNewDisplayName(value) ; 
    } ; 

    const onSubmit = async (event) => {
        event.preventDefault() ; 
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            }) ;
            refreshUser() ; 
        } 
    } ;
     
    const onLogOutClick = () => {
        authService.signOut() ;
    } ; 

    const getMyNweet = async() => {
        const nweets = await dbService
                    .collection("nweets")
                    .where("creatorId", "==", userObj.uid)
                    .orderBy("createdAt", "asc")
                    .get() ; 
        //  nweets.docs.map((doc) => doc.data())
    } ;


    useEffect(() => {
        getMyNweet() ; 
    }, []) ;

    return(
        <>
        <div className="displayDiv">
            <form className="displayForm"
                  onSubmit={onSubmit}>
                <h1 className="profileH1"> {userObj.displayName}'s Profile </h1>
                <input type="submit" 
                       value="Update Profile" 
                       className="updateButton"/>
                <button className="logOutButton"
                        onClick={onLogOutClick}> Log Out </button>
                <input type="text"
                        placeholder="Display name"
                        value={newDisplayName} 
                        onChange={onChange}
                        className="displayInput"/>
            </form>
        </div>
        </>
    )
}

export default ProfileEdit ; 