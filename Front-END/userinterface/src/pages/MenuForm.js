import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderDesktop from '../components/HeaderDesktop';
import { useNavigate } from "react-router-dom";

function AddMenuItemForm({ onAddItem }) {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState(0);
    const [nom, setNom] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        // Récupérer les articles existants lors du chargement du composant
        axios.get('http://213.32.6.121:3023/read?type=Article&ID=2')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des articles:', error);
            });
    }, []);

    const addItem = () => {
        // Recherche de l'objet d'article sélectionné dans la liste
        const selectedObject = items.find(item => item._id === selectedItem);
        
        if (!selectedObject) {
            alert('Article sélectionné invalide');
            return;
        }
        setSelectedItems([...selectedItems, selectedObject]);
    }

    const saveMenu = () => {
        axios.post('http://213.32.6.121:3023/create?type=Menu&ID=2', {
            Nom: nom,
            Description: description,
            Prix: prix,
            Articles: selectedItems
        }).then(response => {
                navigate("/menu");
            })
            .catch(error => {
                console.error("Erreur lors de la création de l'article : ", error);
            });
    }

    const deleteActicle = (id) => {
        // Filtrer la liste des articles sélectionnés pour exclure celui à supprimer
        const updatedSelectedItems = selectedItems.filter(item => item._id !== id);
        // Mettre à jour la liste des articles sélectionnés
        setSelectedItems(updatedSelectedItems);
    }
    

    return (
        <div>
            <HeaderDesktop />

            <div className="container mx-auto p-4 flex flex-col gap-5">
                <div className="">
                    <h1 className="text-3xl font-bold">Création d'un nouveau menu</h1>
                </div>

                <div className="">
                    <label>Choisir un article : </label>
                    <select 
                        className="border border-gray-300 rounded p-2" 
                        value={selectedItem} 
                        onChange={(e) => setSelectedItem(e.target.value)} 
                        required
                    >
                        <option value="">Sélectionner un article</option>
                        {items.map(item => (
                            <option key={item._id} value={item._id}>{item.Nom}</option>
                        ))}
                    </select>

                    <button
                        className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={addItem}
                    >
                        Ajouter au menu
                    </button>
                </div>

                <div className='bg-gray-300 rounded p-4'>
                    {selectedItems.length > 0 ? 
                        selectedItems.map(item => (
                            <div key={item._id} className='flex flex-row gap-4 items-center'>
                                <p>{item.Nom}</p>
                                <button className='p-2 bg-red-500 rounded-full' onClick={() => deleteActicle(item._id)}>x</button>
                            </div>
                        )) : 
                        <div>Aucun article sélectionné</div>
                    }
                </div>

                <div className='flex flex-col gap-3'>
                    <div>
                        <label>Nom du menu : </label>
                        <input className='border border-gray-300 rounded' type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
                    </div>
                    <div className="">
                        <label>Description:</label>
                        <textarea 
                            className="border border-gray-300 rounded p-2 w-full"
                            rows="4" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="">
                        <label>Prix : </label>
                        <span><input type="number" value={prix} onChange={(e) => setPrix(e.target.value)}></input> €</span>
                    </div>
                </div>

                <div className='flex flex-row gap-5'>
                    <button
                        className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={() =>{
                            saveMenu();
                        }}
                    >
                        Ajouter le nouveau menu
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={() =>{
                            navigate('/menu');
                        }}
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddMenuItemForm;
