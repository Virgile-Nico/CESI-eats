// Home.js
import { useEffect, useState } from "react";
import HeaderDesktop from "../components/HeaderDesktop";
import { OrdersList } from "../components/Orders";

// Import de données JSON - cela doit être remplacé par un appel API ou un import local selon votre cas d'utilisation
import ordersData from "./CESI_eats.orders.json";

export default function Home() {
    const [orders, setOrders] = useState({ inProgress: [], finished: [] });


    useEffect(() => {
        // Trier par ID décroissant
        const sortedOrders = ordersData.sort((a, b) => b.ID.localeCompare(a.ID));
        
        // Filtrer les commandes selon le statut
        const inProgressOrders = sortedOrders.filter(order => ['paid', 'in preparation'].includes(order.Status));
        const finishedOrders = sortedOrders.filter(order => ['done', 'in movement'].includes(order.Status));
        
        setOrders({ inProgress: inProgressOrders, finished: finishedOrders });
    }, []);

    const isMobile = window.innerWidth <= 600;
    return (
        <main className="h-screen w-full flex flex-col items-center">
            {!isMobile && <HeaderDesktop articlesCount={0} />}
            {/* Commandes en cours */}
            {orders.inProgress && <OrdersList orders={orders.inProgress} title="Commandes en cours" />}
            {orders.finished && <OrdersList orders={orders.finished} title="Commandes terminées" />}

        </main>
    );
}
