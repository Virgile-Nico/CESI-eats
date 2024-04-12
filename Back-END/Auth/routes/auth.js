const express = require('express')
const router = express.Router();
const authController = require("../controllers/auth.controller");
const logger = require('../controllers/logger');

router.get('/', (req, res, next) => {
    res.status(200)
    .send("Welcome on Auth API")
    next()
})

router.post('/register', (req, res, next) => {
    const type = req.query.type;
    switch(type) {
        case 'user':
            authController.registerUser(req.body);
            console.log('User register')
            break
        case 'restaurant':
            console.log('Restaurant register')
            authController.registerRestaurant(req.body);
            break;
        case 'delivery':
            console.log('Delivery register')
            authController.registerDelivery(req.body);
            break;
        case 'intern':
            console.log('Intern register')
            authController.registerIntern(req.body);
            break;
        case 'tiers':
            console.log('Tiers register')
            authController.registerTiers(req.body);
            break;
        default:
            res.status(404).send("Type unknown");
            return;
    }
    logger.logaction(req.method, req.url, response.status==200, response.message)
    res.status(200)
    res.json("Register successful");
    next()
});

router.post('/login', async (req, res, next) => {
    const type = req.query.type;
    let response
    switch(type) {
        case 'user':
            response = await authController.loginUser(req.body);
            break;
        case 'restaurant':
            response = await authController.loginRestaurant(req.body);
            break;
        case 'delivery':
            response = await authController.loginDelivery(req.body);
            break;
        case 'intern':
            response = await authController.loginIntern(req.body);
            break;
        case 'tiers':
            response = await authController.loginTiers(req.body);
            break;
        default:
            response.status = 404;
            response.message = "Type login unknown"
            res.status(404);
            next();
            return;
    }
    logger.logaction(req.method, req.url, response.status==200, response.message)
    res.json(response);
    next();
});

router.get('/authenticate', (req, res, next) => {
    const type = req.query.type;
    let response
    let token = req.headers["authorization"];
        if (!token) {
            console.log("Token is required.");
            return { status: 403, message: "Token is required." };
        }
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
    switch(type) {
        case 'user':
            console.log('User authenticate')
            response = authController.authenticateUser(token);
            break;
        case 'restaurant':
            console.log('Restaurant authenticate')
            response = authController.authenticateRestaurant(token);
            break;
        case 'delivery':
            console.log('Delivery authenticate')
            response = authController.authenticateDelivery(token);
            break;
        case 'intern':
            console.log('Intern authenticate')
            response = authController.authenticateIntern(token);
            break;
        case 'tiers':
            console.log('Tiers authenticate')
            response = authController.authenticateTiers(token);
            break;
        default:
            res.status(404).send("Type authenticate unknown");
            return;
    }
    res.status(200)
    res.json(response);
    next()
});

module.exports = router;