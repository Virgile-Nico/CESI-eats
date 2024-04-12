import Logo from '../assets/logo/logo.png';
import Icon from '@mdi/react';
import {useNavigate} from "react-router-dom";
import {mdiFood} from "@mdi/js";

export default function HeaderDesktop({articlesCount}) {
    const navigate = useNavigate();
    return(
        <header className="w-full h-20 flex justify-center items-center px-6">
            <div className="flex items-center">
                <img src={Logo} alt="Logo" className="h-24 w-18 cursor-pointer" onClick={() => navigate('/home')} />
            </div>
        </header>
    )
}