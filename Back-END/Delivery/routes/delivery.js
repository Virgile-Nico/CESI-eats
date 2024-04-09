const express = require('express')
const router = express.Router();

const deliveryBoyDB = require("../models/delivery-boy");

/**
 * Retrieve data of the delivery boy
 */
router.get('/delivery-boy', async (req, res, next) => {
    const id = req.query.id
    if(!id) {
        res.status(401);
        res.json({message: "Aucun identifiant n'a été fourni"});
        next();
    }

    try {
        const result = await deliveryBoyDB.select(id);
        if(result) {
            res.status(200);
            res.json({livreur: result});
            next();
        } else {
            res.status(401);
            res.json({message: "Aucun livreur n'a été trouvé avec cet ID"});
            next();
        }
    } catch (err) {
        console.log(err)
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
        res.status(401);
        res.json({message: "Aucun identifiant n'a été fourni"});
        next();
    }

    try {
        const result = await deliveryBoyDB.delete(id);
        if(result) {
            res.status(200);
            res.json({message: "Votre compte a bien été supprimé."});
            next();
        } else {
            res.status(401);
            res.json({message: "Aucun livreur n'a été trouvé avec cet ID"});
            next();
        }
    } catch (err) {
        console.log(err)
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
        res.status(401);
        res.json({message: "Aucun identifiant n'a été fourni"});
        next();
    }

    try {
        const result = await deliveryBoyDB.update(id, req.body);
        if(result) {
            res.status(200);
            res.json({message: "Votre compte a bien été mise à jour."});
            next();
        } else {
            res.status(401);
            res.json({message: "Aucun livreur n'a été trouvé avec cet ID"});
            next();
        }
    } catch (err) {
        console.log(err)
        res.status(500);
        res.json({message: "Internal Server Error"})
        next();
    }
});

/**
 * Retrieve data of the delivery
 */
router.get('/delivery', (req, res, next) => {
    if(req.query.id) {

    }
    res.status(200);
    next();
})

/**
 * Update data of the specified delivery
 * @param id : id of the specified delivery
 */
router.put('/delivery/:id', (req, res, next) => {
    res.status(200);
    next();
})

module.exports = router;