import {useState} from "react";

export default function OrderHistory() {
    const isMobile = window.innerWidth <= 600;
    const [orders, setOrders] = useState([{id: '', date: '', total: 0, qtyItems: 0, status: ''}]);

    return (
        <div>
            <h1>Order History</h1>
        </div>
    )
}