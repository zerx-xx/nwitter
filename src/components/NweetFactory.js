import React, { useState } from "react";
import { dbService, storageService } from "../firebase";
import {v4 as uuidv4} from "uuid" ; 


const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("") ;
    const [attachment, setAttachment] = useState("") ; 

    const onSubmit = async (event) => {
        event.preventDefault() ; 
        let attachmentUrl = "" ; 
        if(attachment !== "") {
            const attachmentRef = storageService
                                .ref()
                                .child(`${userObj.uid}/${uuidv4()}`) ; 
            const response = await attachmentRef.putString(attachment, "data_url") ;
            attachmentUrl = await response.ref.getDownloadURL() ; 
            }
            const nweetObj = {
                text: nweet,
                createdAt: Date.now(), 
                creatorId: userObj.uid,
                attachmentUrl,
        } ; 
        await dbService.collection("nweets").add(nweetObj) ;
        setNweet("") ; 
        setAttachment("") ; 
    } ; 
    const onChange = (event) => {
        const {target: {value}} = event ; 
        setNweet(value) ; 
    } ;

    const onFileChange = (event) => {
        const {target: {files}} = event ; 
        const theFile = files[0] ; 
        const reader = new FileReader() ; 
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent ; 
            setAttachment(result) ; 
        } ;
        reader.readAsDataURL(theFile) ; 
    } ; 

    const onClearAttachmentClick = () => setAttachment(null) ; 

    return (
        <form onSubmit={onSubmit}>
            <input type="text" 
                    placeholder="What's on your mind?"
                    maxLength={600} 
                    value={nweet}
                    onChange={onChange} />
            <input type="file"
                    accept="image/*" 
                    onChange={onFileChange}/>
            <input type="submit"
                    value="Nweet" />
            {attachment && 
                <div>
                    <img src={attachment} width="100px" height="100px" />
                    <button onClick={onClearAttachmentClick}> Cancle </button>     
                </div>}
        </form>
    )
}

export default NweetFactory ; 