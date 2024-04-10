const Orders = require('../models/Order')
const dbMaria = require('./dbMaria');

module.exports = {
    Orders_read: async function(id) {
        let orders = await Orders.Orders.find({
            Status: {
                $in: ["in prepartion", "in mouvement", "Done"]
            },
            ID_delivery: id
        });
        return orders;
    },
    Order_read: async function(id) {
        let orders = await Orders.Orders.findById(id);
        return orders;
    },
    Order_acceptDelivery: async function(ID, Delivery_man) {
        await Orders.Orders.findByIdAndUpdate(ID, {ID_delivery: Delivery_man})
    },
    Order_takeToDelivery: async function(idOrder, idDelivery) {
        const ID = idOrder;
        const Delivery_man = idDelivery;
        const status = "in mouvement";

        await Orders.Orders.findByIdAndUpdate(ID, {Status: status})
    },
    Order_doneDelivery: async function(idOrder) {
        const ID = idOrder;
        const status = "Done";
        await Orders.Orders.findByIdAndUpdate(ID, {Status: status})

        let order = await Orders.Orders.findById(ID)
        await dbMaria.query('INSERT INTO COMMANDES (ID_restaurant, ID_client, ID_Livreur, NUMERO, TOTAL, NB_ARTICLES, STATUT) VALUES (?,?,?,?,?,?,?)',[
            order.ID_restaurant,
            order.ID_client,
            order.ID_delivery,
            order.ID,
            order.Total_price,
            order.Number_products,
            order.Status
        ])
    },
}