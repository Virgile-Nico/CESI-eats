import {React, useEffect, useState} from 'react';
import HeaderDesktop from '../components/HeaderDesktop'; 
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const Menu = () => {
    const [items, setItems] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        // Récupérer les articles existants lors du chargement du composant
        axios.get('http://213.32.6.121:3023/read?type=Menu&ID=2')
            .then(response => {
                console.log(response.data)
                setItems(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des articles:', error);
            });
    }, []);

    return (
        <>
            <HeaderDesktop />
            <div className="menu-container" style={{ margin: '20px' }}>
            <button onClick={() => navigate('/home')} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                ← Retour
            </button>
                <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Menu du Restaurant</h1>
                {items ? items.map((menu) => (
                    <div key={menu._id} className="menu-item" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{menu.Nom}</h2>
                        <p style={{ marginBottom: '10px' }}>{menu.Description}</p>
                        <p style={{ fontWeight: 'bold' }}>Prix : {menu.Prix.toFixed(2)}€</p>
                        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                            {menu.Articles.map((article) => (
                                <li key={article._id} style={{ background: '#f0f0f0', margin: '5px 0', padding: '10px', borderRadius: '4px' }}>
                                    <h3 style={{ fontSize: '18px' }}>{article.Nom}</h3>
                                    <p>{article.Description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )) : <div>
                        Aucun menu à afficher
                    </div>}
                
                <div className='flex flex-row gap-4'>
                    <button onClick={() => navigate('/menu/add')} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Ajouter un nouveau menu
                    </button>
                </div>
            </div>

        </>
    );
};

export default Menu;
