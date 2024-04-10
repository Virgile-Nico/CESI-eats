const express = require('express')
const router = express.Router();
const controller = require('../controllers/client')

router.post('/create', async (req, res, next) =>{
    const body = req.body
    await controller.Order_create(body)
    res.status(200);
    next();
})
router.post('/read', async (req, res, next) =>{
    let result = ""
    const type = req.query.type
    const ID = req.query.ID
    console.log(ID)
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
            break;
    }

    res.status(200);
    next();
})

module.exports = router