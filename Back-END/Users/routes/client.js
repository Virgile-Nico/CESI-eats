const express = require('express')
const router = express.Router();
const controller = require('../controllers/client')

router.post('/create', async (req, res, next) =>{
    const body = req.body
    const type = req.query.type
    const Identifier = req.query.ID
    switch(type){
        case 'Order':
            await controller.Order_create(body, Identifier)
            break;
        case 'Address':
            await controller.Address_create(body, Identifier)
            break;
        case 'card':
            await controller.Card_create(body, Identifier)
            break;
    }
    
    res.status(200);
    next();
})
router.post('/read', async (req, res, next) =>{
    let result = ""
    const type = req.query.type
    const ID = req.query.ID
    switch(type){
        case 'Order':
            result = await controller.Order_read(ID)
            break;
        case 'History':
            result = await controller.Order_history(ID)
            break;
        case 'Account':
            result = await controller.Account_read(ID)
            break;
        case 'card':
            result = await controller.Card_read(ID)
            break;
        case 'adress':
            result = await controller.Address_read(ID)
            break;
        case 'card_account':
            result = await controller.Card_client_read(ID)
            break;
        case 'adress_account':
            result = await controller.Address_client_read(ID)
            break;
    }
    res.status(200);
    res.json(result)
    next();
})
router.post('/update', async (req, res, next) =>{
    const type = req.query.type
    const ID = req.query.ID
    const body = req.body
    switch(type){
        case 'Order':
            await controller.Order_update(body, ID)
            break;
        case 'Account':
            break;
        case 'Addres':
            await controller.Address_update(body, ID)
            break;
        case 'Card':
            await controller.Card_update(body, ID)
            break;
    }

    res.status(200);
    next();
})
router.post('/delete', async (req, res, next) =>{
    const type = req.query.type
    const ID = req.query.ID
    switch(type){
        case 'Order':
            await controller.Order_delete(ID)
            break;
        case 'Account':
            await controller.Account_delete(ID)
            break;
        case 'Card':
            await controller.Card_delete(ID)
            break;
        case 'Adress':
            await controller.Address_delete(ID)
            break;
    }

    res.status(200);
    next();
})

module.exports = router