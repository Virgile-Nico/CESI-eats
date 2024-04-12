import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getRoutes } from './routes';

import NotFound from "./pages/NotFound";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import SuccessConnexion from "./pages/SuccessConnexion";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import DetailedOrder from "./pages/DetailedOrder";
import Menu from "./pages/Menu";

import SecureRoute from "./components/SecureRoute";
import AddArticleForm from "./pages/AtricleForm";
import AddMenuItemForm from "./pages/MenuForm";
import Article from "./pages/Article";

export default function App() {
    return (
        <Router>
        <Routes>
          <Route element={<SecureRoute />}>
              <Route element={<Home/>} path="/home" exact/>
              <Route element={<SuccessConnexion/>} path="/success-connexion" exact/>
              <Route element={<DetailedOrder/>} path="//detailed-order/:id" exact/>
              <Route element={<Menu/>} path="/menu" exact/>
              <Route element={<Article/>} path="/article" exact/>
              <Route element={<AddMenuItemForm/>} path="/menu/add" exact/>
              <Route element={<AddArticleForm/>} path="/article/add" exact/>
              <Route element={<AddMenuItemForm/>} path="/menu/update/:id" exact/>
              <Route element={<AddArticleForm/>} path="/article/update/:id" exact/>
          </Route>
          <Route element={<SignUp/>} path="/sign-up"/>
          <Route element={<Login/>} path="/login"/>
          <Route element={<Splash/>} path="/"/>
          <Route element={<NotFound/>} path="*"/>
        </Routes>
    </Router>

    );
}
