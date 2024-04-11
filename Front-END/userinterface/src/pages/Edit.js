import Icon from "@mdi/react";
import {mdiArrowLeft, mdiCloseBox, mdiEye, mdiEyeOff} from "@mdi/js";
import React, {useState} from "react";
import Logo from "../assets/logo/logo.png";
import axios from "axios";
import HeaderDesktop from "../components/HeaderDesktop";
import Footer from "../components/Footer";

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
    const [payment, setPayment] = useState({cardNumber: '', username: '', expirationDate: '', cvc: ''});
    const isMobile = window.innerWidth <= 600;
    const [notifVisible, setNotifVisible] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

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
        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleChangePayment = (event) => {
        const {name, value} = event.target;
        setPayment(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        try {
            // Example with Axios
            const response = await axios.post('your_api_endpoint', form);
            console.log(response.data); // Handle the response as needed
            setNotifVisible(true);
            setIsSaved(true); // Set to true if the API call is successful
        } catch (error) {
            console.error('Error submitting form:', error);
            setNotifVisible(true);
            setIsSaved(false); // Set to false if the API call fails
        }
    };

    return (
        <main className="flex flex-col">
            {isMobile ? (
                <div className="flex flex-row space-x-6 w-full">
                    <button onClick={back} className="flex flex-row space-x-2 w-50 h-50 bg-gray-200 shadow rounded-full py-2 px-8 hover:bg-gray-100 self-start m-2">
                        <Icon className="my-auto" path={mdiArrowLeft} size={1}/>
                    </button>
                    <div className="flex items-center mb-2">
                    <img alt="logo" src={Logo} className="h-32 w-42 "/>
                    </div>
                </div>
                ) : (
                    <HeaderDesktop articlesCount={0} />
                )
            }
            <div className="flex flex-col items-center h-full w-full space-y-12">
                <button onClick={back}
                        className="flex flex-row space-x-2 w-50 h-50 bg-gray-200 shadow-md rounded-full py-2 px-8 hover:bg-gray-100 hover:shadow-none self-start m-2">
                    <Icon className="my-auto" path={mdiArrowLeft} size={1}/>
                </button>
                <form onSubmit={handleSubmitForm}
                      className={isMobile ? 'flex flex-col md:w-1/3 mx-4 bg-gray-500 rounded-xl p-1.5' : 'flex flex-col md:w-1/3 mx-4 space-y-4 bg-gray-500 rounded-xl p-1.5'}>
                    <h1 className="text-2xl font-semibold text-center text-gray-200">Modifier mon profil</h1>
                    <div className="m-4">
                        <label htmlFor="UserEmail"
                               className="sr-only"> Email </label>

                        <input
                            type="email"
                            id="UserEmail"
                            name={"email"}
                            value={form.email}
                            onChange={handleChangeForm}
                            placeholder="Changer l'adresse email"
                            className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                        />
                        {!isValid &&
                            <p className="text-red-700 bg-transparent">Veuillez entrer une adresse email valide.</p>}
                    </div>
                    <div className="flex flex-row h-10 m-4 rounded-md bg-gray-300 p-2">
                        <input
                            type={showPassword.password ? 'text' : 'password'}
                            placeholder="Nouveau mot de passe"
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
                            placeholder="Nouveau numéro de téléphone"
                            className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                        />
                        {!isPhoneValid &&
                            <p className="text-red-700 bg-transparent">Veuillez entrer un numéro de téléphone
                                valide.</p>}
                    </div>
                    <div className="flex flex-row space-x-4 mx-4">
                        <button type="submit"
                                className="w-60 h-10 bg-primary-500 shadow-md rounded-3xl py-2 px-8 hover:bg-primary-300 mx-auto">
                            <p className="m-auto inset-0 text-xl font-semibold text-center text-gray-800">Enregistrer</p>
                        </button>
                    </div>
                </form>

                <form onSubmit={handleSubmitForm}
                      className={isMobile ? 'flex flex-col md:w-1/3 mx-4 bg-gray-500 rounded-xl p-1.5' : 'flex flex-col md:w-1/3 mx-4 space-y-4 bg-gray-500 rounded-xl p-1.5'}>
                    <h1 className="text-2xl font-semibold text-center text-gray-200">Ajouter une adresse</h1>
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
                    <div className="flex flex-row space-x-4 mx-4">
                        <button type="submit"
                                className="w-60 mx-auto h-10 bg-primary-500 shadow-md rounded-3xl py-2 px-8 hover:bg-primary-300">
                            <p className="m-auto inset-0 text-xl font-semibold text-center text-gray-800">Enregistrer</p>
                        </button>
                    </div>
                </form>


                <form onSubmit={handleSubmitForm}
                      className={isMobile ? 'flex flex-col md:w-1/3 mx-4 bg-gray-500 rounded-xl p-1.5' : 'flex flex-col md:w-1/3 mx-4 space-y-4 bg-gray-500 rounded-xl p-1.5'}>
                    <h1 className="text-2xl font-semibold text-center text-gray-200">Ajouter une carte bancaire</h1>
                    <div className="m-4">
                        <input
                            type="text"
                            name={"cardNumber"}
                            value={payment.cardNumber}
                            placeholder="Numéro de carte"
                            onChange={handleChangePayment}
                            className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                        />
                    </div>
                    <div className="m-4">
                        <input
                            type="text"
                            name={"username"}
                            value={payment.username}
                            placeholder="Prénom et nom du titulaire"
                            onChange={handleChangePayment}
                            className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                        />
                    </div>
                    <div className="m-4">
                        <input
                            type="text"
                            name={"expirationDate"}
                            value={payment.expirationDate}
                            placeholder="Ville"
                            onChange={handleChangePayment}
                            className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                        />
                    </div>
                    <div className="m-4">
                        <input
                            type="text"
                            name={"cvc"}
                            value={payment.cvc}
                            placeholder="Ville"
                            onChange={handleChangePayment}
                            className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-row space-x-4 mx-4">
                        <button type="submit"
                                className="w-60 mx-auto h-10 bg-primary-500 shadow-md rounded-3xl py-2 px-8 hover:bg-primary-300">
                            <p className="m-auto inset-0 text-xl font-semibold text-center text-gray-800">Enregistrer</p>
                        </button>
                    </div>
                </form>

                {notifVisible && (
                    <div
                        className="flex flex-col space-y-4 mx-2 min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-transparent">
                        <div className="flex flex-col p-8 bg-gray-100 border-2 border-gray-200 shadow-2xl rounded-2xl">
                            <div className="flex items-center justify-between">
                                {isSaved ? (
                                    <div className="flex items-center">
                                        <div className="flex flex-col ml-3">
                                            <div className="font-bold text-lg md:text-lg text-green-700">Modification
                                                enregistrée
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <div className="flex flex-col ml-3">
                                            <div className="font-bold text-lg md:text-lg text-red-700">L'enregistrement
                                                a échoué
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <button
                                    onClick={() => setNotifVisible(false)}
                                    className="flex-no-shrink bg-transparent px-5 ml-4 py-2 text-sm text-red-700 hover:text-red-400 font-medium tracking-wider rounded-full"
                                >
                                    <Icon path={mdiCloseBox}
                                          size={2}/>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    )
}