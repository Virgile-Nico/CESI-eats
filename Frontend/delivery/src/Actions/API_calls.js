import axios from 'axios';

//const API_key = 'fbffb76001044886ab870437240204';
export let order_data = null;
export let history_data = null;

export async function getorder_data(searchInput) {
    try{
        axios.get('http://213.32.6.121:3023/read?type=Order&ID=' + searchInput)
        .then(res => {
            order_data = res.data;
            console.log('response received')
            console.log(order_data)
        });
    }
    catch (error) {
        console.error('error fetching data', error)
    }
}

export async function gethistory_data(searchInput) {
    try{
        axios.get('http://213.32.6.121:3023/read?type=History&ID=' + searchInput)
        .then(res => {
            order_data = res.data;
            console.log('response received')
            console.log(order_data)
        });
    }
    catch (error) {
        console.error('error fetching data', error)
    }
}