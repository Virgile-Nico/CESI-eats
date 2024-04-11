// DetailedOrder.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ordersData from './CESI_eats.orders.json'; // Assurez-vous que le chemin est correct
import HeaderDesktop from '../components/HeaderDesktop'; // Assurez-vous que le chemin est correct

const DetailedOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const foundOrder = ordersData.find(order => order.ID === id);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      console.error('Commande non trouvée');
    }
  }, [id]);

  if (!order) {
    return <div>Chargement...</div>;
  }

  // Utilisez les classes CSS existantes ou celles de TailwindCSS pour le styling, selon votre setup
  return (
    <>
      <HeaderDesktop />
      <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Commande n°{order.ID}</h1>
        <p className="text-lg"><strong>Client :</strong> {order.nom_client}</p>
        <p className="text-md text-gray-700"><strong>Status :</strong> {order.Status}</p>
        <p className="text-md text-gray-700"><strong>Nombre de produits :</strong> {order.Number_products}</p>
        
        <div className="my-4">
          {order.Articles.map((article, index) => (
            <div key={article._id} className="flex justify-between my-2">
              <span>{article.Qte} x {article.Nom}</span>
            </div>
          ))}
        </div>

        {order.Menus && order.Menus.map((menu, index) => (
          <div key={menu._id} className="my-4">
            <span className="font-semibold">{menu.Qte} x {menu.Nom}</span>
            <ul className="list-disc ml-6">
              {menu.Articles.map((article) => (
                <li key={article._id}>{article.Nom}</li>
              ))}
            </ul>
          </div>
        ))}
        {/* Ajoutez plus de détails de la commande ici si nécessaire */}
      </div>
    </>
  );
};

export default DetailedOrder;
