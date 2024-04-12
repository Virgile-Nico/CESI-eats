import React, {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiArrowLeft} from "@mdi/js";
import Logo from "../assets/logo/logo.png";
import HeaderDesktop from "../components/HeaderDesktop";
import Footer from "../components/Footer";
import axios from "axios";
import {useSelector} from "react-redux";
import {getUser} from "../actions/userAction";

function back(){
    window.history.back();
}

export default function OrderHistory() {
    const articlesCount = useSelector(state => state.articlesCount);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [isAuthenticatedLocal, setIsAuthenticatedLocal] = useState(isAuthenticated);
    const [isArticlesCountLocal, setIsArticlesCountLocal] = useState(articlesCount);
    useEffect(() => {
        setIsAuthenticatedLocal(isAuthenticated);
        setIsArticlesCountLocal(parseInt(localStorage.getItem('articlesCount')) || 0,);
    }, [isAuthenticated, articlesCount]);
    const isMobile = window.innerWidth <= 600;
    const [orders, setOrders] = useState([{id: '', date: '', total: 0, qtyItems: 0, status: ''}]);

    const userId = isAuthenticated ? getUser().ID : null;

    /*useEffect(() => {
        axios.get(`http://213.32.6.121:3025/read?type=history&ID=${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setOrders(response.data.name)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);*/

    useEffect(() => {
        setOrders([{id: '1', date: '01/01/2021', total: 50, qtyItems: 3, status: 'En cours'}, {id: '2', date: '01/02/2021', total: 30, qtyItems: 2, status: 'En cours'}, {id: '3', date: '01/03/2021', total: 20, qtyItems: 1, status: 'En cours'}]);
    }, []);

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
                <HeaderDesktop articlesCount={isArticlesCountLocal} isAuthenticated={isAuthenticatedLocal} />
            )}
            <div className="flex flex-col space-y-4 items-center">
                <h2 className="text-4xl font-bold text-center text-gray-900">Historique de commandes</h2>
                {orders.map((order, index) => (
                    <div key={index} className={!isMobile ? ("flex flex-col mx-4 w-2/3 shadow rounded-xl p-4") : ("flex flex-col w-5/6 shadow rounded-xl p-4")}>
                        {isMobile ? (
                            <div className="flex flex-col space-y-2">
                                <h3 className="text-2xl font-bold text-gray-700">Commande n°{order.id}</h3>
                                <p className="text-sm text-gray-500">Passée le {order.date}</p>
                                <p className="text-sm text-gray-500">Total : {order.total}€</p>
                                <p className="text-sm text-gray-500">Nombre d'articles : {order.qtyItems}</p>
                                <p className="text-lg font-semibold text-gray-500">Statut : {order.status}</p>
                            </div>) : (
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-col space-y-2">
                                    <h3 className="text-2xl font-bold text-gray-700">Commande n°{order.id}</h3>
                                    <p className="text-sm text-gray-500">Passée le {order.date}</p>
                                    <p className="text-sm text-gray-500">Total : {order.total}€</p>
                                    <p className="text-sm text-gray-500">Nombre d'articles : {order.qtyItems}</p>
                                </div>
                                <p className="text-lg font-semibold text-gray-700">Statut : {order.status}</p>
                            </div>
                            )}
                    </div>
                ))}
        </div>
        <Footer />
</main>
)
}