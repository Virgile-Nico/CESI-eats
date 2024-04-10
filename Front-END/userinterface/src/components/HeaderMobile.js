import Logo from "../assets/logo/logo.png";
import Icon from "@mdi/react";
import {mdiMagnify} from "@mdi/js";

export default function HeaderMobile() {
    return(
        <header className="w-full h-50 flex flex-col items-center px-6 mb-1">
            <div className="flex items-center">
                <img alt="logo" src={Logo} className="h-32 w-42"/>
            </div>
            <div className="flex flex-row h-10 w-2/3 mx-4 rounded-full bg-gray-300 p-2">
                <input
                    type="text"
                    placeholder="Rechercher"
                    className="border-none bg-transparent w-full text-lg text-gray-900 focus:outline-none"
                />
                <Icon path={mdiMagnify} size={1}/>
            </div>
        </header>
    )
}