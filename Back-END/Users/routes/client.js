const express = require('express')
const router = express.Router();
const controller = require('../controllers/client')

router.post('/create', async (req, res, next) =>{
    await controller.Order_create()
    res.status(200);
    next();
})
router.post('/read', async (req, res, next) =>{
    const result = ""

    res.status(200);
    res.json(result)
    next();
})
router.post('/update', async (req, res, next) =>{

    res.status(200);
    next();
})
router.post('/delete', async (req, res, next) =>{

    res.status(200);
    next();
})

module.exports = router