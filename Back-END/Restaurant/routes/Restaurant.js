const express = require('express')
const router = express.Router();

const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
router.use(timeLog)

router.post('/update', (req, res) => {
    const type = req.query.type;

    res.status(200).send("[Restaurant-sevice] Account updated successfully");
});

module.exports = router;