// Orders.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Order = ({ order }) => {
  const navigate = useNavigate();

  // Utilisez une fonction pour obtenir le texte du statut et la couleur en fonction du statut de la commande
  const getStatusTextAndColor = (status) => {
    let text, color;
    switch (status.toLowerCase()) {
      case 'done':
      case 'in movement':
        text = 'Commande terminée';
        color = 'bg-gray-300'; // Choisir une couleur représentant "terminée", ici 'bg-green-200'
        break;
      case 'paid':
      case 'in preparation':
        text = 'Commande en cours';
        color = 'bg-yellow-200'; // Choisir une couleur représentant "en cours", ici 'bg-yellow-200'
        break;
      default:
        text = 'Statut inconnu';
        color = 'bg-gray-200'; // Choisir une couleur pour un statut inconnu, ici 'bg-gray-200'
    }
    return { text, color };
  };
  // Vérifiez si la commande a un statut défini
  const { text: statusLabel, color: statusColor } = order.Status ? getStatusTextAndColor(order.Status) : { text: '', color: '' };

  return (
    <div className={`order-card my-4 p-4 rounded shadow-lg ${statusColor}`}>
      <h3 className="text-lg font-bold">Commande n°{order.ID}</h3>
      <p>Client : {order.nom_client}</p>
      <p>Nombre de produits : {order.Number_products}</p>
      <p>Total : {order.Total_price.toFixed(2)}€</p>
      <p className="text-lg">{statusLabel}</p>
      <button onClick={() => navigate(`/detailed-order/${order._id}`)} className="text-blue-600 hover:text-blue-800">Détails →</button>
    </div>
  );
};

const OrdersList = ({ orders, title }) => {
  return (
    <section className="w-full my-4 px-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {orders.map((order) => (
        <Order key={order._id} order={order} />
      ))}
    </section>
  );
};

export default OrdersList;
