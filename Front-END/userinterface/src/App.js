import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getRoutes } from './routes';

export default function App() {
    return (
        <Router>
            <Routes>
                {getRoutes().map((route) => (
                    <Route exact {...route} key={route.name} />
                ))}
                <Route path="*" element={"NotFound"} />
            </Routes>
        </Router>
    );
}
