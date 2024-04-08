import React, { useState } from 'react';
import {mdiAlert, mdiEye, mdiEyeOff} from '@mdi/js';
import Icon from '@mdi/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MobileConnexion({ firstname, forgetPassword, APIpath, homePage, onTokensReceived }) {
    const [show, setShow] = useState(false);
    const [showNotif, setShowNotif] = useState(false);
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    //const history = useHistory(); // Initialize useHistory

    function onSignIn() {
        // Perform a POST request to the API with the password value
        axios.post(APIpath, { password })
            .then(response => {
                // Handle the API response if necessary
                const { accessToken, refreshToken } = response.data;
                onTokensReceived({ accessToken, refreshToken }); // Pass tokens to the callback function
                navigate(homePage); // Navigate to homePage
                //history.push(homePage); // Navigate to homePage
            })
            .catch(error => {
                // Handle request errors
                setShowNotif(true)
            });
    }

    return (
        <div className="flex flex-col place-items-start space-y-8">
            <h3 className="text-2xl font-semibold text-start text-gray-800">
                Bienvenue, {firstname}
            </h3>
            <div className="flex flex-row space-x-px h-12 w-60 rounded-md bg-gray-300 p-2">
                <input
                    type={show ? 'text' : 'password'}
                    placeholder="Mot de passe"
                    className="border-none bg-transparent text-lg text-gray-900 focus:outline-none"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="bg-transparent" onClick={() => setShow(!show)}>
                    {show ? (
                        <Icon path={mdiEye} size={1} color="currentColor"/>
                    ) : (
                        <Icon path={mdiEyeOff} size={1} color="currentColor"/>
                    )}
                </button>
            </div>
            <button onClick={forgetPassword}
                    className="flex flex-row space-x-2 w-60 h-12 bg-gray-100 shadow rounded-3xl py-2 px-8 hover:bg-gray-300">
                <p className="m-auto inset-0 text-md font-semibold text-center text-gray-800">Mot de passe oublié ?</p>
            </button>
            <button onClick={onSignIn}
                    className="flex flex-row space-x-2 h-12 bg-primary-500 shadow rounded-3xl py-2 px-8 hover:bg-gray-300">
                <p className="m-auto inset-0 text-xl font-bold text-center text-gray-800">Se connecter</p>
            </button>
            {showNotif && (
                <div
                    className="flex flex-col space-y-4 min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-transparent">
                    <div className="flex flex-col p-8 bg-gray-100 border-2 border-gray-200 shadow-2xl hover:shadow-lg rounded-2xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Icon path={mdiAlert} size={3} color={"#b91c1c"} />
                                <div className="flex flex-col ml-3">
                                    <div className="font-medium leading-none">Connexion impossible</div>
                                    <p className="text-sm text-gray-700 leading-none mt-1">
                                        Mot de passe incorrect
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowNotif(false)}
                                className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
