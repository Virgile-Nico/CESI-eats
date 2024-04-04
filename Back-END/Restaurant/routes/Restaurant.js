const express = require('express')
const router = express.Router();
const pool = require('../controllers/dbMaria')

const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
router.use(timeLog)

router.get('/update', async (req, res) => {
    let promise = await pool.getConnection()
    res.status(200)
    .send(JSON.stringify(promise))
    console.log("[Restaurant-sevice] Account updated successfully")
});

module.exports = router;