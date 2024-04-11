// Home.js
import React, { useState, useEffect } from 'react';
import HeaderDesktop from '../components/HeaderDesktop';
import OrdersList from '../components/Orders';
import ordersData from './CESI_eats.orders.json';

const Home = () => {
  const [inProgressOrders, setInProgressOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    const filteredInProgressOrders = ordersData.filter(order =>
      order.Status && (order.Status.toLowerCase() === 'paid' || order.Status.toLowerCase() === 'in preparation'));
    const filteredCompletedOrders = ordersData.filter(order =>
      order.Status && (order.Status.toLowerCase() === 'done' || order.Status.toLowerCase() === 'in movement'));

    setInProgressOrders(filteredInProgressOrders);
    setCompletedOrders(filteredCompletedOrders);
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
