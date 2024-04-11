import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ordersData from './CESI_eats.orders.json';
const DetailedOrder = () => {
  const { id } = useParams(); // Cela devrait maintenant être l'ID de la commande, pas l'ID du client
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Trouver la commande qui correspond à l'ID
    const foundOrder = ordersData.find((o) => o.ID === id);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      // Affichez une erreur ou redirigez si la commande n'est pas trouvée
      console.error('Commande non trouvée');
    }
  }, [id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h1>Commande n°{order.ID}</h1>
      <div style={{ marginBottom: '10px' }}>
        Status : {order.Status}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h2>Nombre de produits : {order.Number_products}</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {order.Articles.map((article, index) => (
            <li key={index} style={{ background: '#f6f6f6', marginBottom: '5px', padding: '10px', borderRadius: '4px' }}>
              {article.Qte} x {article.ID} {/* Replace ID with product name if available */}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginBottom: '10px' }}>
        Client fidèle (nombre de commandes)
      </div>
    </div>
  );
};

export default DetailedOrder;