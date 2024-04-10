import Logo from '../assets/logo/logo.png';
import {useLocation} from "react-router-dom";
import {mdiAccount, mdiCart, mdiHome} from "@mdi/js";
import FooterButton from "./FooterButton";

export default function Footer() {
    const isMobile = window.innerWidth <= 600;
    const location = useLocation();

    return(
        <footer className="w-full fixed bottom-0">
            {isMobile ? (
                <nav className="flex flex-row justify-between items-center px-4 text-gray-400 bg-gray-50">
                    <FooterButton icon={mdiHome} text="Home" path="/home" currentPath={location.pathname} />
                    <FooterButton icon={mdiCart} text="Panier" path="/cart" currentPath={location.pathname} />
                    <FooterButton icon={mdiAccount} text="Mon compte" path="/profile" currentPath={location.pathname} />
                </nav>
            ) : (
                <div className=" bg-gray-500">
                    <div className="max-w-2xl mx-auto text-white py-10">
                        <div className="text-center">
                            <h3 className="text-3xl mb-1.5"> L'application CESI eats est disponible</h3>
                            <p> Une autre livraison de l'excellence. </p>
                            <img src={Logo} className="w-32 mx-auto my-1" alt="..."/>
                            <div className="flex justify-center my-2">
                                <div className="flex items-center border rounded-lg px-4 py-2 w-52 mx-2">
                                    <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                                         className="w-7 md:w-8" alt="..."/>
                                    <div className="text-left ml-3">
                                        <p className='text-xs text-gray-200'>Télécharger sur </p>
                                        <p className="text-sm md:text-base"> Google Play Store </p>
                                    </div>
                                </div>
                                <div className="flex items-center border rounded-lg px-4 py-2 w-44 mx-2">
                                    <img src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                                         className="w-7 md:w-8" alt="..."/>
                                    <div className="text-left ml-3">
                                        <p className='text-xs text-gray-200'>Télécharger sur </p>
                                        <p className="text-sm md:text-base"> Apple Store </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    )
}