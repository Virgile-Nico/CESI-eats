//import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Splash from './pages/Splash';
import SecureRoute from './components/SecuredRoute';

export let token = null;
export let ID_delivery = null

export default function App() {
  ID_delivery = 2
  return (
    <Router>
      <Routes>
        <Route element={<SecureRoute />}>
          <Route element={<Home/>} path="/home" exact/>
        </Route>
        <Route element={<SignUp/>} path="/sign-up"/>
        <Route element={<Login/>} path="/login"/>
        <Route element={<Splash/>} path="/"/>
        <Route element={<NotFound/>} path="*"/>
      </Routes>
    </Router>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);