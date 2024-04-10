function Order({ order }) {
    return (
        <div className="flex justify-between items-center bg-yellow-200 p-4 rounded-lg mb-2 mx-4">
            <div>
                <p className="mb-2">Nombre de produits : {order.Number_products}</p>
                <p>{order.ID_client} {order.ID.slice(-4)}</p>
            </div>
            <div className="text-right">
                <p className="mb-2">{order.Status === 'done' ? 'Livraison effectuée' : 'En préparation'}</p>
                <button className="text-blue-500">Détails →</button>
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
