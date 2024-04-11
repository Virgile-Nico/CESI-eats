import { useNavigate } from 'react-router-dom';

function Order({ order }) {
    // Déterminer la couleur de fond en fonction du statut de la commande
    const bgColor = order.Status === 'done' ? 'bg-gray-300' : 'bg-yellow-200';

    const navigate = useNavigate();

    const showDetails = () => {
      navigate(`/detailed-order/${order.ID}`); // Ici, utilisez l'ID unique de la commande pour la navigation
    };

    return (
        <div className={`flex flex-col justify-between items-start ${bgColor} p-4 rounded-lg mb-2 mx-4 w-full`}>
            <div className="flex justify-between w-full">
                <p><span className="font-bold">Nombre de produits :</span> {order.Number_products}</p>
                <p>{order.Status === 'done' ? 'Livraison effectuée' : 'En préparation'}</p>
            </div>
            <div className="flex justify-between w-full mt-2">
                <p>{order.ID.slice(0)}</p>
                <button onClick={showDetails} className="text-blue-500">Détails →</button>
            </div>
        </div>
    );
}


export function OrdersList({ orders, title }) {
    return (
        <section>
            <h2 className="text-lg font-semibold my-4">{title}</h2>
            {orders.map(order => (
                <Order key={order.ID} order={order} />
            ))}
        </section>
    );
}
