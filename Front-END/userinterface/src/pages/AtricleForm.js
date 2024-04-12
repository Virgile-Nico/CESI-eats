import React, { useEffect, useState } from 'react';
import HeaderDesktop from '../components/HeaderDesktop';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

function AddArticleForm({ onSubmit }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState(0);

    
    const saveArticle = () => {
        axios.post('http://213.32.6.121:3023/create?type=Article&ID=2', {
            Nom: nom,
            Description: description,
            Prix: prix
        }).then(response => {
            navigate("/article");
        })
        .catch(error => {
                console.error("Erreur lors de la création de l'article : ", error);
            });
    }
    const updateArticle = (Identifier) => {
        axios.post(`http://213.32.6.121:3023/update?type=Article&ID=${Identifier}`, {
            Nom: nom,
            Description: description,
            Prix: prix
        }).then(response => {
            navigate("/article");
        })
        .catch(error => {
                console.error("Erreur lors de la création de l'article : ", error);
            });
    }
    const deleteArticle = (Identifier) => {
        axios.post(`http://213.32.6.121:3023/delete?type=Article&ID=${Identifier}`).then(response => {
            navigate("/article");
        })
        .catch(error => {
                console.error("Erreur lors de la création de l'article : ", error);
            });
    }
    
    useEffect(() => {
        if(id) {
            axios.get('http://213.32.6.121:3023/read?type=single_Article&ID='+id)
            .then(response => {
                setNom(response.data.Nom);
                setDescription(response.data.Description);
                console.log(response.data)
                setPrix(response.data.Prix);
            })
            .catch(error => {
                console.error("Erreur lors de la création de l'article : ", error);
            });
        }
    }, [id])

    return (
        <>
            <HeaderDesktop/>

            <div className="container mx-auto p-4 flex flex-col gap-5">
                <div className="">
                    <h1 className="text-3xl font-bold">Création d'un nouvel article</h1>
                </div>

                <div>
                    <div>
                        <label>Nom de l'article : </label>
                        <input className='border border-gray-300 rounded' type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
                    </div>
                    <div className="">
                        <label>Description : </label>
                        <textarea 
                            className="border border-gray-300 rounded p-2 w-full"
                            rows="4" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Prix : </label>
                        <input className='border border-gray-300 rounded' type="number" step="0.01" min="0" value={prix} onChange={(e) => setPrix(e.target.value)} required />
                        <span> € </span>
                    </div>
                </div>

                <div className='flex flex-row gap-5'>
                    <button
                        className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={() =>{
                            if(id){
                                updateArticle(id) 
                            }
                            else{
                                saveArticle()
                            }
                        }}
                    >
                        { id ? <span>Sauvegarder les modifications</span> : <span>Ajouter le nouvel article</span> }
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={() =>{
                            navigate('/article');
                        }}
                    >
                        Annuler
                    </button>
                    {id ?
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={() =>{
                            deleteArticle(id) 
                        }}
                    >
                        <span>Supprimer l'article</span>
                    </button>
                    : <div></div>}
                </div>
            </div>
        </>
    );
}

export default AddArticleForm;
