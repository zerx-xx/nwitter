// import React, { useState } from "react";
// import { dbService, storageService } from "../firebase";
// import "/Users/drizzle/nwitter/src/css/nweet.modul.css" ;

// const Delete = ({nweetObj, isOwner}) => {
//     const onDeleteClick = async () => {
//         const ok = window.confirm("Are you sure you want to delete this nweet?") ;
//         if(ok) {
//             await dbService.doc(`nweets/${nweetObj.id}`).delete() ; 
//             await storageService.refFromURL(nweetObj.attachmentUrl).delete() ; 
//         }
//     } ; 
    
//     return (
//         <div>
//         {isOwner && (
//             <>
//             <form>
//                 <button onClick={onDeleteClick}> Delete Nweet </button>
//             </form>
//             </>
//         )}
//         </div>
//     )
// }

// export default Delete ; 
