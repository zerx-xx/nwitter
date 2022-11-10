import React, { useState } from "react";
import Delete from "./Delete";
import Nweet from "./Nweet";

const Modal = () => {
    const [list, setList] = useState(false) ; 

    const onSubmit = (event) => {
        event.preventDefault() ;
    }
    const onModalClick = () => {

    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <button onClick={onModalClick}>
                    <Nweet />
                </button>
            </form>
        </div>
    )
}

export default Modal ; 