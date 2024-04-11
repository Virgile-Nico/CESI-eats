import React, {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiArrowLeft} from "@mdi/js";
import Logo from "../assets/logo/logo.png";
import HeaderDesktop from "../components/HeaderDesktop";
import Footer from "../components/Footer";
import axios from "axios";

function back(){
    window.history.back();
}

export default function OrderHistory() {
    const isMobile = window.innerWidth <= 600;
    const [orders, setOrders] = useState([{id: '', date: '', total: 0, qtyItems: 0, status: ''}]);

    useEffect(() => {
        axios.get('api-call')
            .then(response => {
                setOrders(response.data.name)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
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
                <HeaderDesktop articlesCount={0} />
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