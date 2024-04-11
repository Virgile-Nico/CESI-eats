import React from 'react';
import menuData from './CESI_eats.menu.json'; // Assurez-vous que le chemin est correct
import HeaderDesktop from '../components/HeaderDesktop'; // Utilisez le chemin correct pour importer HeaderDesktop

const Menu = () => {
    return (
        <>
            <HeaderDesktop />
            <div className="menu-container" style={{ margin: '20px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Menu du Restaurant</h1>
                {menuData.map((menu) => (
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
                ))}
            </div>
        </>
    );
};

export default Menu;
