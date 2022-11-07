import React, { useEffect, useState } from "react";
import { authService, dbService } from "../firebase";

const Profile = ({refreshUser, userObj}) => {
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
        refreshUser() ; 
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
        <form onSubmit={onSubmit}>
            <input type="text"
                   placeholder="Display name"
                   value={newDisplayName} 
                   onChange={onChange}/>
            <input type="submit" 
                   value="Update Profile" />
        </form>
            <button onClick={onLogOutClick}> Log Out </button>
        </>
    )
}

export default Profile ; 