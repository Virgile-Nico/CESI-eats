import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderDesktop from '../components/HeaderDesktop';
import OrdersList from '../components/Orders';

const Home = () => {
  const [inProgressOrders, setInProgressOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://213.32.6.121:3023/read?type=History&ID=2');
        const orders = response.data;
        const filteredInProgressOrders = orders.filter(order =>
          order.Status && (order.Status.toLowerCase() === 'paid' || order.Status.toLowerCase() === 'in preparation'));
        const filteredCompletedOrders = orders.filter(order =>
          order.Status && (order.Status.toLowerCase() === 'done' || order.Status.toLowerCase() === 'in movement'));
  
        setInProgressOrders(filteredInProgressOrders);
        setCompletedOrders(filteredCompletedOrders);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des commandes', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <HeaderDesktop />
      <div className="container mx-auto px-4">
        <OrdersList orders={inProgressOrders} title="Commandes en cours" />
        <OrdersList orders={completedOrders} title="Commandes terminées" />
      </div>
    </>
  );
};

export default Home;
