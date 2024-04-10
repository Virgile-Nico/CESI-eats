import Logo from '../assets/logo/logo.png'
import Icon from '@mdi/react';
import {mdiArrowRight, mdiCheckCircle} from '@mdi/js';
import {useNavigate} from "react-router-dom";


export default function SuccessConnexion () {
    const navigate = useNavigate();
    const isMobile = window.innerWidth <= 600;

    return (
        <main className="h-screen w-full flex flex-col items-center space-y-8 mt-2">
            <img alt="logo" src={Logo} className="h-9/12 w-1/4" />
            {isMobile && (
                <div
                    className="p-0.5 bg-primary-500 border-1 rounded-full border-primary-500 text-gray-900 self-start mx-4">
                    <Icon path={mdiCheckCircle} size={4}/>
                </div>
            )}
            <div className="flex flex-col mx-4 space-y-4">
                {!isMobile && (
                    <div
                        className="p-0.5 text-gray-900 mx-4">
                        <Icon path={mdiCheckCircle} size={4} className="border-2 bg-primary-500 rounded-full border-primary-500" />
                    </div>
                )}
                <h2 className="text-2xl font-bold text-gray-900">Connexion réussie</h2>
                <p className="text-gray-600">Vous allez être redirigé vers votre compte d’ici un instant. Si rien ne se
                    passe, cliquez sur le bouton “Continuer”.</p>
                <button className="flex flex-row space-x-2 w-1/2 h-10 bg-primary-500 shadow-md rounded-3xl py-2 px-8 hover:bg-primary-300" onClick={() => navigate('/')}>
                    <p className="m-auto inset-0 text-xl font-semibold text-center text-gray-800">Continuer</p>
                    <Icon className="my-auto" path={mdiArrowRight} size={1} />
                </button>
            </div>
        </main>
    )
}