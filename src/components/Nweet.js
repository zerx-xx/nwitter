import React, { useState } from "react";
import { dbService, storageService } from "../firebase";
import Modal from "./modal";
import "/Users/drizzle/nwitter/src/css/nweet.modul.css" ;
import deletelogo from "/Users/drizzle/nwitter/src/imag/delete.png" ; 
import pencilelofo from "/Users/drizzle/nwitter/src/imag/pencile.png" ;

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
        <div className="allEdit">
        <div className="DivDiv">
            <div className="nweetDiv">
                {editing ? (
                <>
                <form className="editFrom" onSubmit={onSubmit}>
                    <textarea type="text" 
                        placeholder="Edit your nweet."
                        value={newNweet}
                        onChange={onChange} 
                        required 
                        className="editInput"/>
                    <input className="editButton"
                        type="submit" 
                        value="Update" /> 
                    <button className="buttonCancle" onClick={toggleEditing}> Cancle </button>
                </form> 
                </>
                ) : (
                <>
                    <div className="nweetDiv">
                        <form className="nweetForm">
                            <h4> {nweetObj.text} </h4>
                            {nweetObj.attachmentUrl && (
                                <img src={nweetObj.attachmentUrl} width="100px" height="100px"/>
                            )}
                        </form>
                        {isOwner && (
                        <>
                            <form className="buttonForm">
                                <button className="buttonDelete" onClick={onDeleteClick}> 
                                    <img src={deletelogo} width="15" height="18" /></button>
                                <button className="buttonEdit" onClick={toggleEditing}> 
                                    <img src={pencilelofo} width="18" height="18" /></button>
                            </form>
                        </>
                        )}
                    </div>
                </>
                )}
            </div>
        </div>
        </div>
    )
} ;

export default Nweet ; 