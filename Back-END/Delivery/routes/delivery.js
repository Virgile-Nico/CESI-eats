const express = require('express')
const router = express.Router();

/**
 * Retrieve data of the delivery boy
 */
router.get('/delivery-boy', (req, res, next) => {
    res.status(200);

    res.json({message: "Hello"})

    next();
});

/**
 * Delete delivery boy account
 */
router.delete('/delivery-boy/:id', (req, res) => {
    res.status(200);
    next();
});

/**
 * Update delivery boy account
 */
router.put('/delivery-boy/:id', (req, res) => {
    res.status(200);
    next();
});

/**
 * Update data of the specified delivery
 * @param id : id of the specified delivery
 */
router.put('/delivery/:id', (req, res) => {
    res.status(200);
    next();
})

/**
 * Retrieve data of the delivery
 */
router.get('/delivery', (req, res) => {
    if(req.query.id) {

    }
    res.status(200);
    next();
})

module.exports = router;