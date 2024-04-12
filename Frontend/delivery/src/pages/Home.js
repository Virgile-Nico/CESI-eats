import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderDesktop from '../components/HeaderDesktop';

const Home = () => {
  const [inProgressOrders, setInProgressOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    axios.get('http://213.32.6.121:3021/delivery?deliver_id=2').then((response) => {
      const orders = response.data;
      const filteredInProgressOrders = orders.filter(order =>
        order.Status && (order.Status.toLowerCase() === 'in preparation'));
      const filteredCompletedOrders = orders.filter(order =>
        order.Status && (order.Status.toLowerCase() === 'done'));

      setInProgressOrders(filteredInProgressOrders);
      setCompletedOrders(filteredCompletedOrders);

    })
    .catch((err) => {
      console.error('Erreur lors de la récupération des données des commandes', err);

    })
  });

  return (
    <>
      <HeaderDesktop />
      <div className="container mx-auto px-4">

        <div>
        <div>Nouvelles courses : </div>

          {inProgressOrders.length !== 0 ? inProgressOrders.map((order) => {
            return <div key={order._id} className='flex flex-col gap-4 bg-gray-300'>
              {order}
            </div>
          }) : <div className='flex flex-col gap-4 bg-red-300 p-4 rounded'>Aucune commande n'est à livrer pour le moment</div>}        
        </div>

        <div>
          <div>Courses précédentes : </div>

          <div className='flex flex-col gap-4'>
            {completedOrders.length !== 0 ? completedOrders.map((order) => {
              return <div key={order._id} className='flex flex-col gap-4 bg-gray-300 p-4 rounded'>
                {order.ID}
              </div>
            }) : <div>Aucune commande n'a été livré pour l'instant</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;