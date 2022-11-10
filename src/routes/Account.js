import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import "/Users/drizzle/nwitter/src/css/account.modul.css"

const Account = () => {
    return(
        <div className="divwrite">
            <h3 className="h3write"> 다른 계정이 필요한가요? </h3>
            <h5 className="h5write"> 업무용 계정이 필요하거나 혹은 그저 부모님께 계정을 들키고 싶지 않다면 또 다른 계정을 만들 수 있습니다. </h5>
                <form className="buttonform">
                    <Auth />
                    <Link to="/authform"> 
                        <button className="emailButton"> Continue with Email </button> 
                    </Link>
                </form>
            <p className="pwrite"> 가입하면 nwitter의 이용악관, 개인정보 처리 방침, 쿠키 사용에 동의하게 됩니다. </p>
            <footer className="footer"> &copy; {new Date().getFullYear()} Twitter </footer>
        </div>
    )
}

export default Account ;