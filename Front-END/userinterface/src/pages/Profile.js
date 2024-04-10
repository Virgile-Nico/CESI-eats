import Avatar from "../components/Avatar";
import Footer from "../components/Footer";
import Icon from "@mdi/react";
import {mdiInvoiceList, mdiMinusBox, mdiPlusBox} from "@mdi/js";
import {useNavigate} from "react-router-dom";
import Address from "../components/Address";
import {useEffect, useState} from "react";
import axios from "axios";
import CardPayment from "../components/CardPayment";

export default function Profile() {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [payments, setPayments] = useState([]);
    const [displayCount, setDisplayCount] = useState(7);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandedAddress, setIsExpandedAddress] = useState(false);

    const handleShowMoreAddress = () => {
        setIsExpandedAddress(true);
        setDisplayCount(addresses.length);
    };
    const handleShowMorePayment = () => {
        setIsExpanded(true);
        setDisplayCount(payments.length);
    };

    const handleShowLessAddress = () => {
        setIsExpandedAddress(false);
        setDisplayCount(3);
    };
    const handleShowLessPayement = () => {
        setIsExpanded(false);
        setDisplayCount(2);
    };

    useEffect(() => {
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
    }, []);

    /*const App = () => {
        useEffect(() => {
            axios.get('api-call')
                .then(response => {
                    setAddresses(response.data.name)
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }, [])

        useEffect(() => {
            axios.get('api-call')
                .then(response => {
                    setPayements(response.data.name)
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }, [])
    }*/

    return (
        <main className="flex flex-col items-center justify-between h-screen">
            <Avatar firstname={'Nathalie'} lastname={'parisse'} />
            <div className="flex flex-col items-start h-full w-full space-y-2">
                <button className="flex flex-row space-x-4 bg-transparent hover:bg-gray-200 w-60 p-4" onClick={() => navigate('/orders')}>
                    <Icon path={mdiInvoiceList} size={1}/>
                    <span className="text-lg font-semibold text-gray-700">Mes commandes</span>
                </button>
                <div className="flex flex-col mx-4">
                    <h3 className="text-lg font-semibold text-gray-700">Mes adresses</h3>
                    <div className="flex flex-row space-x-8">
                        <div className="flex flex-col">
                            {addresses.slice(0, displayCount).map((address, index) => (
                                <Address key={index} street={address.street} zipCode={address.zipCode}
                                         city={address.city}/>
                            ))}
                        </div>
                        <div className="flex items-center justify-center">
                            {addresses.length > 3 && !isExpandedAddress && (
                                <button className="bg-transparent flex flex-row items-center        p-2"
                                        onClick={handleShowMoreAddress}>
                                    <div
                                        className="place-content-center justify-center p-4 rounded-xl ">
                                        <Icon path={mdiPlusBox} size={1}/>
                                    </div>
                                    <h5 className="text-center text-xs md:text-sm font-semibold">Afficher plus</h5>
                                </button>
                            )}
                            {isExpandedAddress && (
                                <button className="bg-transparent flex flex-row items-center        p-2"
                                        onClick={handleShowLessAddress}>
                                    <div
                                        className="place-content-center justify-center p-4 rounded-xl ">
                                        <Icon path={mdiMinusBox} size={1}/>
                                    </div>
                                    <h5 className="text-center text-xs md:text-sm font-semibold">Afficher moins</h5>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mx-4">
                    <h3 className="text-lg font-semibold text-gray-700">Mes moyens de paiements</h3>
                    <div className="flex flex-row space-x-8">
                        <div className="flex flex-col">
                            {payments.slice(0, displayCount).map((payment, index) => (
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
                                    <h5 className="text-center text-xs md:text-sm font-semibold">Afficher plus</h5>
                                </button>
                            )}
                            {isExpanded && (
                                <button className="bg-transparent flex flex-row items-center        p-2"
                                        onClick={handleShowLessPayement}>
                                    <div
                                        className="place-content-center justify-center p-4 rounded-xl ">
                                        <Icon path={mdiMinusBox} size={1}/>
                                    </div>
                                    <h5 className="text-center text-xs md:text-sm font-semibold">Afficher moins</h5>
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