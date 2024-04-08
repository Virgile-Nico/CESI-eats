const express = require('express')
const router = express.Router();
const controller = require('../controllers/restaurant')

const timeLog = (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
}
router.use(timeLog)

router.get('/read', async (req, res) => {
    const type = req.query.type;
    const ID = req.query.ID;
    switch(type) {
        case 'Account':
            const response = await controller.Account_read(ID)
            const categories = await controller.Categories_read(ID)

            const result = {
                ...response,
                categories: categories
            }
            console.log(categories)
            res.status(200)
            .send(result)
            console.log("[Restaurant-sevice] Restaurant retrieved successfully")
            break;
        case 'Hours':
            await controller.Hours_read(ID)
            console.log("[Restaurant-sevice] Restaurant hours retrieved successfully")
            break;
        case 'Article':
            await controller.Article_read(ID)
            console.log("[Restaurant-sevice] Restaurant article retrieved successfully")
            break;
        case 'Menu':
            await controller.Menu_read(ID)
            console.log("[Restaurant-sevice] Restaurant menu retrieved successfully")
            break;
    }
    

})

router.post('/update', async (req, res) => {
    const type = req.query.type;
    const ID = req.query.ID;
    const body = req.body
    switch(type) {
        case 'Account':
            await controller.Account_update(ID, body)
            console.log("[Restaurant-sevice] Restaurant updated successfully")
            break;
        case 'Hours':
            await controller.Hours_update(ID, body)
            console.log("[Restaurant-sevice] Restaurant hours updated successfully")
            break;
        case 'Article':
            await controller.Article_update(ID, body)
            console.log("[Restaurant-sevice] Restaurant article updated successfully")
            break;
        case 'Menu':
            await controller.Menu_update(ID, body)
            console.log("[Restaurant-sevice] Restaurant menu updated successfully")
            break;
        case 'Categories':
            console.log("[Restaurant-sevice] Restaurant category updated successfully")
    }
    res.status(200)
    .send("success")
    
});

router.post('/create', async (req, res) => {
    const ID = req.query.ID;
    const body = req.body;
    await controller.Hours_create(ID, body.day, body.open, body.close)


    res.status(200)
    .send("success")
    
});

module.exports = router;