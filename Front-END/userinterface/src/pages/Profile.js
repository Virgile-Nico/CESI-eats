import Avatar from "../components/Avatar";
import Footer from "../components/Footer";
import Icon from "@mdi/react";
import {mdiInvoiceList, mdiMinusBox, mdiPlusBox} from "@mdi/js";
import {useNavigate} from "react-router-dom";
import Address from "../components/Address";
import {useEffect, useState} from "react";
import axios from "axios";
import CardPayment from "../components/CardPayment";
import HeaderDesktop from "../components/HeaderDesktop";
import {useSelector} from "react-redux";
import {logout} from "../actions/authActions";
import {getUser} from "../actions/userAction";

export default function Profile() {
    const articlesCount = useSelector(state => state.articlesCount);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [isAuthenticatedLocal, setIsAuthenticatedLocal] = useState(isAuthenticated);
    const [isArticlesCountLocal, setIsArticlesCountLocal] = useState(articlesCount);
    useEffect(() => {
        setIsAuthenticatedLocal(isAuthenticated);
        setIsArticlesCountLocal(articlesCount);
    }, [isAuthenticated, articlesCount]);
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [payments, setPayments] = useState([]);
    const [displayCountAddress, setDisplayCountAddress] = useState(3);
    const [displayCountPayment, setDisplayCountPayment] = useState(2);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandedAddress, setIsExpandedAddress] = useState(false);
    const isMobile = window.innerWidth <= 600;

    const handleShowMoreAddress = () => {
        setIsExpandedAddress(true);
        setDisplayCountAddress(addresses.length);
    };
    const handleShowMorePayment = () => {
        setIsExpanded(true);
        setDisplayCountPayment(payments.length);
    };

    const handleShowLessAddress = () => {
        setIsExpandedAddress(false);
        setDisplayCountAddress(3);
    };
    const handleShowLessPayement = () => {
        setIsExpanded(false);
        setDisplayCountPayment(2);
    };

    /*useEffect(() => {
        setAddresses([
            { street: '1 rue de la paix', zipCode: '75000', city: 'Paris' },
            { street: '2 rue de la paix', zipCode: '75000', city: 'Paris' },
            { street: '3 rue de la paix', zipCode: '75000', city: 'Paris' },
            { street: '4 rue de la paix', zipCode: '75000', city: 'Paris' },
            { street: '5 rue de la paix', zipCode: '75000', city: 'Paris' },
        ]);
        setPayments([
            { cardNumber: '1234 5678 9101 1121', username: 'Nathalie Parisse', cvc: '123', date: '12/23' },
            { cardNumber: '1234 567 9101 1121', username: 'Nathalie Parisse', cvc: '123', date: '12/23' },
            { cardNumber: '1234 5678 9101 1121', username: 'Nathalie Parisse', cvc: '123', date: '12/23' },
            { cardNumber: '1234 567 9101 1121', username: 'Nathalie Parisse', cvc: '123', date: '12/23' },
            { cardNumber: '1234 567 9101 1121', username: 'Nathalie Parisse', cvc: '123', date: '12/23' },
        ])
    }, []);*/

    const userId = isAuthenticated ? getUser().id : null;

    useEffect(() => {
        if (userId) {
            axios.get(`http://213.32.6.121:3025/read?type=address&ID=${userId}`)
                .then(response => {
                    if (response.data !== undefined) {
                        setAddresses(response.data);
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });

            axios.get(`http://213.32.6.121:3025/read?type=card&ID=${userId}`)
                .then(response => {
                    if (response.data !== undefined) {
                        setPayments(response.data);
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }, [userId]);

    return (
        <main className="flex flex-col items-center justify-between h-screen">
            {!isMobile && (<HeaderDesktop isAuthenticated={isAuthenticatedLocal} articlesCount={isArticlesCountLocal} />)}
            <Avatar firstname={'Nathalie'} lastname={'parisse'} />
            <button className="bg-gray-200 font-semibold rounded-lg p-2 text-primary-500 hover:bg-gray-100 mb-2" onClick={() => navigate('/profile/edit')}>Modifier mon profil</button>
            <button className="bg-gray-200 rounded-lg p-2 text-gray-500 hover:bg-gray-100" onClick={logout}>Déconnexion</button>
            <div className={isMobile ? "flex flex-col items-start h-full w-full space-y-2" : "flex flex-row justify-between items-start h-full w-full mt-12 p-2"}>
                <button className="flex flex-row space-x-4 bg-transparent hover:bg-gray-200 w-60 p-4" onClick={() => navigate('/profile/order-history')}>
                    <Icon path={mdiInvoiceList} size={1}/>
                    <span className="text-lg font-semibold text-gray-700">Mes commandes</span>
                </button>
                <div className="flex flex-col mx-4">
                    <h3 className="text-lg font-semibold text-gray-700">Mes adresses</h3>
                    <div className={isMobile ? "flex flex-row space-x-8" : "flex flex-col space-x-8"} >
                        <div className="flex flex-col">
                            {addresses.slice(0, displayCountAddress).map((address, index) => (
                                <Address key={index} street={address.street} zipCode={address.zipCode}
                                         city={address.city}/>
                            ))}
                        </div>
                        <div className="flex items-center justify-center">
                            {addresses.length > 3 && !isExpandedAddress && (
                                <button className="bg-transparent flex flex-row items-center p-2"
                                        onClick={handleShowMoreAddress}>
                                    <div
                                        className="place-content-center justify-center p-4 rounded-xl ">
                                        <Icon path={mdiPlusBox} size={1}/>
                                    </div>
                                </button>
                            )}
                            {isExpandedAddress && (
                                <button className="bg-transparent flex flex-row items-center p-2"
                                        onClick={handleShowLessAddress}>
                                    <div
                                        className="place-content-center justify-center p-4 rounded-xl ">
                                        <Icon path={mdiMinusBox} size={1}/>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col mx-4">
                    <h3 className="text-lg font-semibold text-gray-700">Mes moyens de paiements</h3>
                    <div className={isMobile ? "flex flex-row space-x-8" : "flex flex-col space-x-8"}>
                        <div className="flex flex-col">
                            {payments.slice(0, displayCountPayment).map((payment, index) => (
                                <CardPayment key={index} cardNumber={payment.cardNumber} username={payment.username} cvc={payment.cvc} date={payment.date}/>
                            ))}
                        </div>
                        <div className="flex items-center justify-center">
                            {payments.length > 2 && !isExpanded && (
                                <button className="bg-transparent flex flex-row items-center        p-2"
                                        onClick={handleShowMorePayment}>
                                    <div
                                        className="place-content-center justify-center p-4 rounded-xl ">
                                        <Icon path={mdiPlusBox} size={1}/>
                                    </div>
                                </button>
                            )}
                            {isExpanded && (
                                <button className="bg-transparent flex flex-row items-center        p-2"
                                        onClick={handleShowLessPayement}>
                                    <div
                                        className="place-content-center justify-center p-4 rounded-xl ">
                                        <Icon path={mdiMinusBox} size={1}/>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    )
}