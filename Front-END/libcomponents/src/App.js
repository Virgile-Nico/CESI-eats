import React, { useState } from "react";
import BackBtn from "./components/BackBtn";
import NextBtn from "./components/NextBtn";
import CartBtn from "./components/CartBtn";
import SignInBtn from "./components/SignInBtn";
import SignUpBtn from "./components/SignUpBtn";
import Avatar from "./components/Avatar";
import MobileConnexion from "./components/MobileConnexion";
import { BrowserRouter as Router } from 'react-router-dom';

function test() {
    console.log("Button clicked");
}

export default function App() {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    const handleTokensReceived = ({ accessToken, refreshToken }) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
    };

    return (
        <Router>
            <div className="flex flex-col place-items-center place-content-center">
                <div className="flex flex-row space-x-4">
                    <BackBtn />
                    <BackBtn text={"Retour"} />
                    <NextBtn onClick={test} text={"Suivant"} />
                    <NextBtn onClick={test} />
                    <CartBtn articlesCount={"0"} onClick={test} />
                    <CartBtn articlesCount={"5"} onClick={test} />
                    <SignInBtn onClick={test} />
                    <SignUpBtn onClick={test} />
                </div>
                <Avatar firstname={"Nathalie"} lastname={"parisse"} />
                <MobileConnexion firstname={"Nathalie"} forgetPassword={test} onSignIn={test} onTokensReceived={handleTokensReceived} />
            </div>
        </Router>
    );
}
