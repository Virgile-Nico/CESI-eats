const express = require('express')
const router = express.Router();

const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
router.use(timeLog)

router.post('/register', (req, res) => {
    const type = req.query.type;
    switch(type) {
        case 'user':
            console.log('User register')
            break;
        case 'restaurant':
            console.log('Restaurant register')
            break;
        case 'delivery':
            console.log('Delivery register')
            break;
        case 'intern':
            console.log('Intern register')
            break;
        case 'tiers':
            console.log('Tiers register')
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
            break;
        case 'restaurant':
            console.log('Restaurant login')
            break;
        case 'delivery':
            console.log('Delivery login')
            break;
        case 'intern':
            console.log('Intern login')
            break;
        case 'tiers':
            console.log('Tiers login')
            break;
        default:
            res.status(404).send("Type login");
            return;
    }
    res.status(200).send("Login successful");
});

router.get('/authenticate', (req, res) => {
    
});

module.exports = router;