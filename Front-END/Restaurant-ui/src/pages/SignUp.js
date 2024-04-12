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
    const [form, setForm] = useState({Name: '', email: '', password: '', phone: '', CP: '', Ville: '', Adresse: '', siret: '', rib: '', categories: []});
    const isMobile = window.innerWidth <= 600;

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (event.target.type === "select-multiple") {
            const valueArray = Array.from(event.target.selectedOptions, (option) => option.value);
            setForm(prevState => ({
                ...prevState,
                [name]: valueArray
            }));
        } else {
            setForm(prevState => ({
                ...prevState,
                [name]: value
            }));
            if (name === "email") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                setIsValid(emailRegex.test(value));
            }
    
            if (name === "phone") {
                const phoneRegex = /^(\+33|0|0033)[1-9](\d{2}){4}$/;
                setIsPhoneValid(phoneRegex.test(value));
            }
        }
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
            {isMobile && (<img alt="logo" src={Logo} className="h-1/6 w-1/4"/>)}
            {!isMobile && (<img alt="logo" src={Logo} className="h-1/4 w-1/6"/>)}
            <form className={isMobile ? 'flex flex-col md:w-1/3 mx-4' : 'flex flex-col md:w-1/3 mx-4 space-y-4'}>
                <h2 className="text-2xl md:text-4xl font-bold text-center m-6 text-gray-900">Inscription</h2>
                <div className="m-4">
                    <label htmlFor="RestaurantName"
                           className="sr-only"> Prénom </label>

                    <input
                        type="text"
                        id="RestaurantName"
                        name={"Name"}
                        value={form.Name}
                        placeholder="Entrez le nom de votre enseigne"
                        onChange={handleChange}
                        className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                    />
                </div>
                <div className="m-4">
                    <label htmlFor="RestaurantEmail"
                           className="sr-only"> Email </label>

                    <input
                        type="email"
                        id="RestaurantEmail"
                        name={"email"}
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Entrez votre adresse email"
                        className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                    />
                    {!isValid &&
                        <p className="text-red-700 bg-transparent">Veuillez Entrez une adresse email valide.</p>}
                </div>
                <div className="flex flex-row h-10 m-4 rounded-md bg-gray-300 p-2">
                    <input
                        type={showPassword.password ? 'text' : 'password'}
                        placeholder="Entrez votre mot de passe"
                        className="border-none bg-transparent w-full sm:text-sm text-gray-900 focus:outline-none"
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
                        className="border-none bg-transparent w-full sm:text-sm text-gray-900 focus:outline-none"
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
                    <label htmlFor="RestaurantPhone"
                           className="sr-only"> Téléphone </label>

                    <input
                        type="phone"
                        id="RestaurantPhone"
                        name={"phone"}
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Entrez votre numéro de téléphone"
                        className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                    />
                    {!isPhoneValid &&
                        <p className="text-red-700 bg-transparent">Veuillez Entrez un numéro de téléphone valide.</p>}
                </div>
                <div className="m-4">
                    <label htmlFor="RestaurantCP"
                           className="sr-only"> Code Postal </label>

                    <input
                        type="CP"
                        id="RestaurantCP"
                        name={"CP"}
                        value={form.CP}
                        onChange={handleChange}
                        placeholder="Entrez votre code postal"
                        className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                    />
                    </div>
                    <div className="m-4">
                    <label htmlFor="RestaurantVille"
                           className="sr-only"> Ville </label>

                    <input
                        type="Ville"
                        id="RestaurantVille"
                        name={"Ville"}
                        value={form.Ville}
                        onChange={handleChange}
                        placeholder="Entrez votre ville"
                        className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                    />
                    </div>
                    <div className="m-4">
                    <label htmlFor="RestaurantAdresse"
                           className="sr-only"> Adresse </label>

                    <input
                        type="Adresse"
                        id="RestaurantAdresse"
                        name={"Adresse"}
                        value={form.Adresse}
                        onChange={handleChange}
                        placeholder="Entrez votre adresse"
                        className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                    />
                    </div>
                    <div className="m-4">
                    <label htmlFor="Restaurantsiret"
                           className="sr-only"> siret </label>

                    <input
                        type="siret"
                        id="Restaurantsiret"
                        name={"siret"}
                        value={form.siret}
                        onChange={handleChange}
                        placeholder="Entrez votre siret"
                        className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                    />
                    </div>
                    <div className="m-4">
                    <label htmlFor="Restaurantrib"
                           className="sr-only"> rib </label>

                    <input
                        type="rib"
                        id="Restaurantrib"
                        name={"rib"}
                        value={form.rib}
                        onChange={handleChange}
                        placeholder="Entrez votre rib"
                        className="w-full h-10 rounded-md border-gray-200 bg-gray-300 px-4 shadow-sm sm:text-sm focus:outline-none"
                    />
                    </div>

                    <div className="m-4">
                    <label htmlFor="categoriesSelect" className="block text-sm font-medium text-gray-700">
                            Choisissez les catégories
                    </label>
                        <select
                          id="categoriesSelect"
                          name="categories"
                          multiple
                          value={form.categories}
                          onChange={handleChange}
                          className="block w-full h-auto rounded-md border-gray-200 bg-gray-300 px-4 py-2 shadow-sm sm:text-sm focus:outline-none"
                        >
                          <option value="cuisine_francaise">Cuisine Française</option>
                          <option value="cuisine_italienne">Cuisine Italienne</option>
                          <option value="plats_vegetariens">Plats Végétariens</option>
                          <option value="cuisine_asiatique">Cuisine Asiatique</option>
                          <option value="fruits_de_mer">Fruits de Mer et Poissons</option>
                          <option value="cuisine_americaine">Cuisine Américaine</option>
                          <option value="gastronomie_haute_cuisine">Gastronomie et Haute Cuisine</option>
                        </select>
                    </div>
                    
                <div className="flex flex-row space-x-4 mx-4 my-24">
                    <button type="button" onClick={goBack} className="w-1/2 h-10 bg-gray-300 shadow-md rounded-3xl py-2 px-8 hover:bg-gray-500">
                        <p className="m-auto inset-0 text-xl font-semibold text-center text-gray-800">Annuler</p>
                    </button>
                    <button type="submit" onClick={(e) => e.preventDefault()} className="w-1/2 h-10 bg-primary-500 shadow-md rounded-3xl py-2 px-8 hover:bg-primary-300">
                        <p className="m-auto inset-0 text-xl font-semibold text-center text-gray-800">Confirmer</p>
                    </button>
                </div>
            </form>
        </main>
    )
}