import React from "react";
import {Link} from "react-router-dom" ;
import HomeLogo from "/Users/drizzle/nwitter/src/imag/home logo.png" ;
import ProfileLogo from "/Users/drizzle/nwitter/src/imag/profile.png" ;
import twitterlogo from "/Users/drizzle/nwitter/src/imag/twitter logo.png" ;
import "/Users/drizzle/nwitter/src/css/navigation.moule.css" ; 


const Navigation = ({userObj}) => {
    return(
        <div className="listUl">
            <nav className="nav">
                <ul>
                <img className="twitterlogo" src={twitterlogo} width="38" height="33" />
                    <li className="homeTitle">
                        <Link to="/"> <img src={HomeLogo} width="40" height="40"/></Link>
                    </li>
                    <li className="profileTitle">
                        <Link to="/profile"> <img src={ProfileLogo} width="40" height="40"/> </Link>
                    </li>
                </ul>
            </nav>
        </div>
    ) 
}

export default Navigation ; 