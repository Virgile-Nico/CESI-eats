import Icon from "@mdi/react";
import {mdiArrowLeft, mdiEye, mdiEyeOff} from "@mdi/js";
import React, {useState} from "react";
import Logo from "../assets/logo/logo.png";

function back(){
    window.history.back();
}

export default function Edit() {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isSame, setIsSame] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [form, setForm] = useState({email: '', password: '', phone: ''});
    const [address, setAddress] = useState({street: '', city: '', zipCode: ''});
    const isMobile = window.innerWidth <= 600;

    const handleChangeForm = (event) => {
        const { name, value } = event.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Regular expression to validate the email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(value));

        const phoneRegex = /^(\+33|0|0033)[1-9](\d{2}){4}$/
        setIsPhoneValid(phoneRegex.test(value));
    };

    const handlePassword = (event) => {
        const { value } = event.target;
        setPassword(value);

        setIsSame(value === form.password);
    };

    const handlePasswordToggle = (field, event) => {
        event.preventDefault();
        setShowPassword(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    const handleChangeAddress = (event) => {
        const {name, value} = event.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <main>
            <button onClick={back}
                    className="flex flex-row space-x-2 w-50 h-50 bg-gray-200 shadow rounded-full py-2 px-8 hover:bg-gray-100 self-start m-2">
                <Icon className="my-auto" path={mdiArrowLeft} size={1}/>
            </button>
            <div className="flex flex-col items-center h-full w-full space-y-2">
                <div className="flex items-center mb-2">
                    <img alt="logo" src={Logo} className="h-32 w-42 "/>
                </div>
                <h1 className="text-2xl font-semibold text-center text-gray-700">Modifier mon profil</h1>
                <form className={isMobile ? 'flex flex-col md:w-1/3 mx-4' : 'flex flex-col md:w-1/3 mx-4 space-y-4'}>
                    <div className="m-4">
                        <label htmlFor="UserEmail"
                               className="sr-only"> Email </label>

                        <input
                            type="email"
                            id="UserEmail"
                            name={"email"}
                            value={form.email}
                            onChange={handleChangeForm}
                            placeholder="Entrer votre adresse email"
                            className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                        />
                        {!isValid &&
                            <p className="text-red-700 bg-transparent">Veuillez entrer une adresse email valide.</p>}
                    </div>
                    <div className="flex flex-row h-10 m-4 rounded-md bg-gray-300 p-2">
                        <input
                            type={showPassword.password ? 'text' : 'password'}
                            placeholder="Entrer votre mot de passe"
                            className="border-none px-2 bg-transparent w-full sm:text-sm text-gray-900 focus:outline-none"
                            value={form.password}
                            name={"password"}
                            onChange={handleChangeForm}
                        />
                        <button className="bg-transparent"
                                type="button"
                                onClick={(e) => handlePasswordToggle('password', e)}>
                            {showPassword.password ? (
                                <Icon path={mdiEye}
                                      size={1}
                                      color="currentColor"/>
                            ) : (
                                <Icon path={mdiEyeOff}
                                      size={1}
                                      color="currentColor"/>
                            )}
                        </button>
                    </div>
                    <div className="flex flex-row h-10 m-4 rounded-md bg-gray-300 p-2">
                        <input
                            type={showPassword.confirmPassword ? 'text' : 'password'}
                            placeholder="Confirmer votre mot de passe"
                            className="border-none bg-transparent w-full sm:text-sm text-gray-900 px-2 focus:outline-none"
                            value={password}
                            onChange={handlePassword}
                        />
                        <button className="bg-transparent"
                                type="button"
                                onClick={(e) => handlePasswordToggle('confirmPassword', e)}>
                            {showPassword.confirmPassword ? (
                                <Icon path={mdiEye}
                                      size={1}
                                      color="currentColor"/>
                            ) : (
                                <Icon path={mdiEyeOff}
                                      size={1}
                                      color="currentColor"/>
                            )}
                        </button>
                    </div>
                    {!isSame &&
                        <p className="text-red-700 bg-transparent">Les mot de passe sont différents.</p>}
                    <div className="m-4">
                        <label htmlFor="UserPhone"
                               className="sr-only"> Téléphone </label>

                        <input
                            type="phone"
                            id="UserPhone"
                            name={"phone"}
                            value={form.phone}
                            onChange={handleChangeForm}
                            placeholder="Entrer votre numéro de téléphone"
                            className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                        />
                        {!isPhoneValid &&
                            <p className="text-red-700 bg-transparent">Veuillez entrer un numéro de téléphone
                                valide.</p>}
                    </div>
                    <div className="flex flex-row space-x-4 mx-4 my-24">
                        <button type="submit" onClick={(e) => e.preventDefault()}
                                className="w-1/2 h-10 bg-primary-500 shadow-md rounded-3xl py-2 px-8 hover:bg-primary-300">
                            <p className="m-auto inset-0 text-xl font-semibold text-center text-gray-800">Confirmer</p>
                        </button>
                    </div>
                </form>
                <h1 className="text-2xl font-semibold text-center text-gray-700">Ajouter une adresse</h1>
                <form className={isMobile ? 'flex flex-col md:w-1/3 mx-4' : 'flex flex-col md:w-1/3 mx-4 space-y-4'}>
                    <div className="m-4">
                        <input
                            type="text"
                            name={"street"}
                            value={address.street}
                            placeholder="Numéro et nom de rue"
                            onChange={handleChangeAddress}
                            className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                        />
                    </div>
                    <div className="m-4">
                        <input
                            type="text"
                            name={"zipCode"}
                            value={address.zipCode}
                            placeholder="Code postal"
                            onChange={handleChangeAddress}
                            className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                        />
                    </div>
                    <div className="m-4">
                        <input
                            type="text"
                            name={"city"}
                            value={address.city}
                            placeholder="Ville"
                            onChange={handleChangeAddress}
                            className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-row space-x-4 mx-4 my-24">
                        <button type="submit" onClick={(e) => e.preventDefault()}
                                className="w-1/2 h-10 bg-primary-500 shadow-md rounded-3xl py-2 px-8 hover:bg-primary-300">
                            <p className="m-auto inset-0 text-xl font-semibold text-center text-gray-800">Confirmer</p>
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}