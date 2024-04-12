import React, { useState, useEffect } from 'react';
import { order_data, getorder_data, history_data, gethistory_data} from '../Actions/API_calls'
import { ID_delivery } from '../App';

async function data() {
    let data = await gethistory_data(ID_delivery)
    return data
}

export default async function Home() {
    const [data, setData] = useState(null)

    useEffect(async () =>{
        setData(await data());
    }, []);
    
    if(data === null){
        return (
        <div>
            <h1>Home</h1>
            <p>Loading</p>
        </div>
        );
    }
    else{
        return (
        <div>
            <h1>Home</h1>
            <h2>Commandes en cours</h2>
            <h2>Historique</h2>
            <p>{JSON.stringify(data.filter(data => data.status === "Done"))}</p>
        </div>)

    }
    
  };
  