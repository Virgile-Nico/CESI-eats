const express = require('express')
const router = express.Router();
const authController = require("../controllers/auth.controller");

const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
router.use(timeLog)

router.post('/register', (req, res) => {
    const type = req.query.type;
    switch(type) {
        case 'user':
            authController.registerUser(req.body);
            console.log('User register')
            return res.status(201).json({ "msg": "New user created!" });
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
    res.status(200).send("Register successful");
});

router.post('/login', (req, res) => {
    const type = req.query.type;
    switch(type) {
        case 'user':
            console.log('User login')
            authController.loginUser(req.body);
            console.log('Finishing login user')
            break;
        case 'restaurant':
            console.log('Restaurant login')
            authController.loginRestaurant(req.body);
            break;
        case 'delivery':
            console.log('Delivery login')
            authController.loginDelivery(req.body);
            break;
        case 'intern':
            console.log('Intern login')
            authController.loginIntern(req.body);
            break;
        case 'tiers':
            console.log('Tiers login')
            authController.loginTiers(req.body);
            break;
        default:
            res.status(404).send("Type login unknown");
            return;
    }
    res.status(200).send("Login successful");
});

router.get('/authenticate', (req, res) => {
    const type = req.query.type;
    let token = req.headers["authorization"];
        if (!token) {
            console.log("Token is required.");
            return { status: 403, message: "Token is required." };
        }
    
        // Extrait le token JWT du préfixe "Bearer"
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
          }
    switch(type) {
        case 'user':
            console.log('User authenticate')
            authController.authenticateUser(token);
            break;
        case 'restaurant':
            console.log('Restaurant authenticate')
            authController.authenticateRestaurant(token);
            break;
        case 'delivery':
            console.log('Delivery authenticate')
            authController.authenticateDelivery(token);
            break;
        case 'intern':
            console.log('Intern authenticate')
            authController.authenticateIntern(token);
            break;
        case 'tiers':
            console.log('Tiers authenticate')
            authController.authenticateTiers(token);
            break;
        default:
            res.status(404).send("Type authenticate unknown");
            return;
    }
    res.status(200).send("Authentification successful");
});

module.exports = router;