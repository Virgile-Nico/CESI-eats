//import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Layout from './components/layout';
import Account from './components/account';
import Home from './components/home';
import Login from './components/Login';
import Order from './components/order';
import Register from './components/register';

export let token = null;
export let ID_delivery = null

export default function App() {
  ID_delivery = 2
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Account" element={<Account />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Order" element={<Order />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);