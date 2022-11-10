import React, { useState } from "react";
import { dbService, storageService } from "../firebase";
import {v4 as uuidv4} from "uuid" ; 
import "/Users/drizzle/nwitter/src/css/nweetfactory.modul.css"
import "/Users/drizzle/nwitter/src/css/reset.css"
import photologo from "/Users/drizzle/nwitter/src/imag/photo.png"
import cancile from "/Users/drizzle/nwitter/src/imag/cancile.png" 


const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("") ;
    const [attachment, setAttachment] = useState("") ; 

    const onSubmit = async (event) => {
        event.preventDefault() ; 
        // if (nweet === "") {
        //     return;
        // }
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
        if (Boolean(theFile)) {
        reader.readAsDataURL(theFile) ; 
        }
    } ; 

    const onClearAttachmentClick = () => setAttachment(null) ; 

    
    return (
        <div className="writeDiv">
            <form className="writeForm" 
                    onSubmit={onSubmit}>
                <div>
                    <textarea className="writeInput" 
                            type="text" 
                            placeholder="What's on your mind?"
                            maxLength={600} 
                            value={nweet}
                            onChange={onChange} />
                        
                </div>
                    <input
                        id="attach-file"
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        style={{
                        opacity: 0,
                        }}
                    />
                    <div className="divFile">
                        <label for="attach-file" className="factoryInput__label">
                                <img className="imgFile" src={photologo} width="30" height="29" />
                            <input className="writeButton" 
                                    type="submit"
                                    value="Nweet" /> 
                        </label>
                    </div>
                {attachment && 
                    <div className="cancleButton" >
                        <img className="attachmentFileImge" src={attachment} width="auto" height="100px" />
                        <div className="factoryForm__clear" onClick={onClearAttachmentClick}>
                        <img className="cancileButton" src={cancile} width="10px" height="10px"/>
                        </div> 
                    </div>}
            </form>
        </div>
    )
}

export default NweetFactory ; 