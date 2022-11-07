import React, { useState } from "react";
import { dbService, storageService } from "../firebase";

const Nweet = ({nweetObj, isOwner, attachmentUrl}) => {
    const [editing, setEditing] = useState(false) ; 
    const [newNweet, setNewNweet] = useState(nweetObj.text) ; 

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?") ;
        if(ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete() ; 
            await storageService.refFromURL(nweetObj.attachmentUrl).delete() ; 
        }
    } ; 

    const toggleEditing = () => setEditing((prev) => !prev) ; 

    const onSubmit = async (event) => {
        event.preventDefault() ; 
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet,
        }) ;
        setEditing(false) ; 
    } ; 

    const onChange = (event) => {
        const {target: {value}} = event ; 
        setNewNweet(value) ; 
    } ;

    return (
        <div>
            {editing ? (
            <>
            <form onSubmit={onSubmit}>
                <input type="text" 
                       placeholder="Edit your nweet."
                       value={newNweet}
                       onChange={onChange} 
                       required />
                <input type="submit" 
                       value="Update Nweet" /> 
            </form> 
            <button onClick={toggleEditing}> Cancle </button>
            </>
            ) : (
            <>
                <h4> {nweetObj.text} </h4>
                {nweetObj.attachmentUrl && (
                    <img src={nweetObj.attachmentUrl} width="100px" height="100px"/>
                )}
                {isOwner && (
                <>
                    <button onClick={onDeleteClick}> Delete Nweet </button>
                    <button onClick={toggleEditing}> Update Nweet </button>
                </>
                )}
            </>
            )}
        </div>
    )
} ;

export default Nweet ; 