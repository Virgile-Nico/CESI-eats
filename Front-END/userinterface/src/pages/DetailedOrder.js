import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Assurez-vous que axios est installé et importé
import HeaderDesktop from '../components/HeaderDesktop'; // Assurez-vous que le chemin est correct

const DetailedOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`http://213.32.6.121:3023/read?type=Order&ID=${id}`) // Utilisation des templates strings pour inclure l'ID
      .then(res => {
        if (res.data) {
          setOrder(res.data); // Met à jour le state directement avec la réponse
        } else {
          console.error('Commande non trouvée');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données', error);
      });
  }, [id]);

  if (!order) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <HeaderDesktop />
      <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded shadow">
        {/* Bouton de retour */}
        <div className="flex justify-start mb-4">
          <button onClick={() => navigate('/home')} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            ← Retour
          </button>
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">Commande <span className='p-1 bg-gray-200 rounded'>{order.ID}</span></h1>
        <p className="text-lg"><strong>Client :</strong> {order.nom_client}</p>
        <p className="text-md text-gray-700"><strong>Nombre de produits :</strong> {order.Number_products}</p>
        
        <div className="my-4">
          <h1>Articles</h1>
          {order.Articles && order.Articles.map((article, index) => (
            <div key={article._id} className="flex flex-col p-2 bg-primary-200 rounded">
              <span className='font-semibold'>{article.Qte} x {article.Nom}</span>
              <span className='text-gray-500'>{article.Description}</span>
            </div>
          ))}
        </div>

        <div>
          <h1>Menus</h1>
          {order.Menus && order.Menus.map((menu, index) => (
            <div key={menu._id} className="flex flex-col p-2 bg-primary-200 rounded">
              <span className="font-semibold">{menu.Qte} x {menu.Nom}</span>
              <span className='text-gray-500'>{menu.Description}</span>
            </div>
          ))}
        </div>
        {/* Ajoutez plus de détails de la commande ici si nécessaire */}
        <p className="text-md text-gray-700 pt-5"><strong>Prix :</strong> {order.Total_price} €</p>
      </div>
    </>
  );
};

export default DetailedOrder;
