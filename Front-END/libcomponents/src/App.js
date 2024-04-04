import React from "react";
import BackBtn from "./components/BackBtn";
import NextBtn from "./components/NextBtn";
import CartBtn from "./components/CartBtn";
import SignInBtn from "./components/SignInBtn";

function test() {
    console.log("Button clicked")
}

export default function App() {
    return (
        <div className="flex m-4">
            <div className="flex flex-row space-x-4">
                <BackBtn />
                <BackBtn text={"Retour"} />
                <NextBtn onClick={test} />
                <CartBtn articlesCount={"0"} onClick={test} />
                <CartBtn articlesCount={"5"} onClick={test} />
                <SignInBtn onClick={test} />
            </div>
        </div>
    )
}

