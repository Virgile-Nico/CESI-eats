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
            <div className="flex items-center space-x-4">
                <button
                    className="flex flex-row space-x-2 w-50 bg-neutral-900 shadow rounded-3xl py-2 px-8 text-gray-100 hover:bg-neutral-700"
                    onClick={() => navigate('/menu')}>
                    <Icon className="my-auto" path={mdiFood} size={1}/>
                    <p className="m-auto inset-0 text-lg font-semibold text-center">Menu</p>
                </button>
                <button
                    className="flex flex-row space-x-2 w-50 bg-neutral-900 shadow rounded-3xl py-2 px-8 text-gray-100 hover:bg-neutral-700"
                    onClick={() => navigate('/article')}>
                    <Icon className="my-auto" path={mdiFood} size={1}/>
                    <p className="m-auto inset-0 text-lg font-semibold text-center">Articles</p>
                </button>
            .</div>
        </header>
    )
}