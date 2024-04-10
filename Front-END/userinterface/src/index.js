import React from 'react';
import './index.css';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App';
import {createRoot} from "react-dom/client";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
