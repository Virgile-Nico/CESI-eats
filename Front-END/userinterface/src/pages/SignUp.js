import Logo from "../assets/logo/logo.png";
import {useState} from "react";
import Icon from "@mdi/react";
import {mdiEye, mdiEyeOff} from "@mdi/js";
import {useNavigate} from "react-router-dom";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isSame, setIsSame] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [form, setForm] = useState({firstname: '', lastname: '', email: '', password: '', phone: '', sponsorCode: ''});
    const isMobile = window.innerWidth <= 600;

    const handleChange = (event) => {
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

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/login');
    }

    return(
        <main className="h-screen w-full flex flex-col items-center my-2">
            {isMobile && (<img alt="logo" src={Logo} className="h-40 w-50"/>)}
            {!isMobile && (<img alt="logo" src={Logo} className="h-50 w-64"/>)}
            <form className={isMobile ? 'flex flex-col md:w-1/3 mx-4' : 'flex flex-col md:w-1/3 mx-4 space-y-4'}>
                <h2 className="text-2xl md:text-4xl font-bold text-center m-6 text-gray-900">Inscription</h2>
                <div className="m-4">
                    <label htmlFor="UserFirstname"
                           className="sr-only"> Prénom </label>

                    <input
                        type="text"
                        id="UserFirstname"
                        name={"firstname"}
                        value={form.firstname}
                        placeholder="Entrer votre prénom"
                        onChange={handleChange}
                        className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                    />
                </div>
                <div className="m-4">
                    <label htmlFor="UserLastname"
                           className="sr-only"> Nom </label>

                    <input
                        type="text"
                        id="UserLastname"
                        name={"lastname"}
                        value={form.lastname}
                        placeholder="Entrer votre nom"
                        onChange={handleChange}
                        className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                    />
                </div>
                <div className="m-4">
                    <label htmlFor="UserEmail"
                           className="sr-only"> Email </label>

                    <input
                        type="email"
                        id="UserEmail"
                        name={"email"}
                        value={form.email}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        placeholder="Entrer votre numéro de téléphone"
                        className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                    />
                    {!isPhoneValid &&
                        <p className="text-red-700 bg-transparent">Veuillez entrer un numéro de téléphone valide.</p>}
                </div>
                <div className="m-4">
                    <label htmlFor="UserSponsor"
                           className="sr-only"> Code de parrainage </label>

                    <input
                        type="text"
                        id="UserSponsor"
                        name={"sponsorCode"}
                        value={form.sponsorCode}
                        placeholder="Entrer votre code de parrainage"
                        onChange={handleChange}
                        className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                    />
                </div>
                <div className="flex flex-row space-x-4 mx-4 my-24">
                    <button type="button" onClick={goBack}
                            className="w-1/2 h-10 bg-gray-300 shadow-md rounded-3xl py-2 px-8 hover:bg-gray-500">
                        <p className="m-auto inset-0 text-xl font-semibold text-center text-gray-800">Annuler</p>
                    </button>
                    <button type="submit" onClick={(e) => e.preventDefault()}
                            className="w-1/2 h-10 bg-primary-500 shadow-md rounded-3xl py-2 px-8 hover:bg-primary-300">
                        <p className="m-auto inset-0 text-xl font-semibold text-center text-gray-800">Confirmer</p>
                    </button>
                </div>
            </form>
        </main>
    )
}