const express = require('express')
const router = express.Router();
const logger = require('../controllers/logger');

const deliveryBoyDB = require("../controllers/delivery-boy");
const deliveryDB = require("../controllers/delivery");

router.get('/', (req, res, next) => {
    res.status(200)
    .send("Welcome on delivery API")
    next()
})

/**
 * Retrieve data of the delivery boy
 */
router.get('/delivery-boy', async (req, res, next) => {
    const id = req.query.id
    if(!id) {
        await logger.logaction(req.method, req.url, false, "No ID provided")
        res.status(401);
        res.json({message: "Aucun identifiant n'a été fourni"});
        next();
    }

    try {
        const result = await deliveryBoyDB.select(id);
        if(result) {
            await logger.logaction(req.method, req.url, true, "Response send")
            res.status(200);
            res.json({livreur: result});
            next();
        } else {
            await logger.logaction(req.method, req.url, false, "Livreur not find with ID : " + id);
            res.status(401);
            res.json({message: "Aucun livreur n'a été trouvé avec cet ID"});
            next();
        }
    } catch (err) {
        await logger.logaction(req.method, req.url, false, JSON.stringify(err))
        res.status(500);
        res.json({message: "Internal Server Error"})
        next();
    }
});

/**
 * Delete delivery boy account
 */
router.delete('/delivery-boy/:id', async (req, res, next) => {
    const id = req.params.id
    if(!id) {
        await logger.logaction(req.method, req.url, false, "No ID provided")
        res.status(401);
        res.json({message: "Aucun identifiant n'a été fourni"});
        next();
    }

    try {
        const result = await deliveryBoyDB.delete(id);
        if(result) {
            await logger.logaction(req.method, req.url, true, "Response send")
            res.status(200);
            res.json({message: "Votre compte a bien été supprimé."});
            next();
        } else {
            await logger.logaction(req.method, req.url, false, "Livreur not find with ID : " + id)
            res.status(401);
            res.json({message: "Aucun livreur n'a été trouvé avec cet ID"});
            next();
        }
    } catch (err) {
        await logger.logaction(req.method, req.url, false, JSON.stringify(err))
        res.status(500);
        res.json({message: "Internal Server Error"})
        next();
    }
});

/**
 * Update delivery boy account
 */
router.post('/delivery-boy/:id', async (req, res, next) => {
    const id = req.params.id
    if(!id) {
        await logger.logaction(req.method, req.url, false, "No ID provided")
        res.status(401);
        res.json({message: "Aucun identifiant n'a été fourni"});
        next();
    }

    try {
        const result = await deliveryBoyDB.update(id, req.body);
        if(result) {
            await logger.logaction(req.method, req.url, true, "Response send")
            res.status(200);
            res.json({message: "Votre compte a bien été mise à jour."});
            next();
        } else {
            await logger.logaction(req.method, req.url, false, "Livreur not find with ID : " + id)
            res.status(401);
            res.json({message: "Aucun livreur n'a été trouvé avec cet ID"});
            next();
        }
    } catch (err) {
        await logger.logaction(req.method, req.url, false, JSON.stringify(err))
        res.status(500);
        res.json({message: "Internal Server Error"})
        next();
    }
});

/**
 * Retrieve data of the delivery
 */
router.get('/delivery', async (req, res, next) => {
    let result = "";
    if(req.query.id) {
        result = await deliveryDB.Order_read(req.query.id);
    } else if(req.query.deliver_id) {
        result = await deliveryDB.Orders_read(req.query.deliver_id);
    } else {
        res.status(400);
        next();
    }
    res.status(200);
    res.json(result)
    next();
})

/**
 * Update data of the specified delivery
 * @param id : id of the specified delivery
 */
router.post('/delivery/:id', async (req, res, next) => {
    switch(req.query.Action) {
        case 'accept': 
            await deliveryDB.Order_acceptDelivery(req.params.id, req.body.delivery_boy);
            break;
        case 'deliver':
            await deliveryDB.Order_doneDelivery(req.params.id)
            break;
        case 'pick-up':
            await deliveryDB.Order_takeToDelivery(req.params.id, req.body.delivery_boy)
            break;
        default:
            res.status(400);
            next();
            break;
    }
    res.status(200);
    next();
})

module.exports = router;
