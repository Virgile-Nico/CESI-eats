const express = require('express')
const router = express.Router();
const controller = require('../controllers/restaurant')

router.post('/create', async (req, res) => {
    const ID = req.query.ID;
    const type = req.query.type;
    const body = req.body;
    switch(type){
        case 'Hours':
            await controller.Hours_create(ID, body.day, body.open, body.close)
            break;
        case 'Article':
            await controller.Article_create(ID, body)
            break;
        case 'Menu':
            await controller.Menu_create(ID, body)
            break;
    }
    
    res.status(200)
    .send("success")
    
});

router.get('/read', async (req, res) => {
    const type = req.query.type;
    const ID = req.query.ID;
    switch(type) {
        case 'Account':
            const response_Account = await controller.Account_read(ID)
            const categories = await controller.Categories_read(ID)
            const hours = await controller.Hours_read(ID)

            const result = {
                ...response_Account,
                categories: categories,
                hours: hours
            }
            res.status(200)
            .send(result)
            console.log("[Restaurant-sevice] Restaurant retrieved successfully")
            break;
        case 'Hours':
            await controller.Hours_read(ID)
            console.log("[Restaurant-sevice] Restaurant hours retrieved successfully")
            break;
        case 'Article':
            const response_Article = await controller.Article_read(ID)
            res.status(200)
            .send(response_Article)
            console.log("[Restaurant-sevice] Restaurant article retrieved successfully")
            break;
        case 'Menu':
            const response_Menu = await controller.Menu_read(ID)
            res.status(200)
            .send(response_Menu)
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
            await controller.Categories_update(ID, body.categories)
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
    }
    res.status(200)
    .send("success")   
});
router.post('/delete', async (req, res) => {
    const type = req.query.type;
    const ID = req.query.ID;
    switch(type) {
        case 'Account':
            await controller.Account_delete(ID)
            console.log("[Restaurant-sevice] Restaurant deleted successfully")
            break;
        case 'Hours':
            await controller.Hours_delete(ID)
            console.log("[Restaurant-sevice] Restaurant hours deleted successfully")
            break;
        case 'Article':
            await controller.Article_delete(ID)
            console.log("[Restaurant-sevice] Restaurant article deleted successfully")
            break;
        case 'Menu':
            await controller.Menu_delete(ID)
            console.log("[Restaurant-sevice] Restaurant menu deleted successfully")
            break;
    }
    res.status(200)
    .send("success")   
});

module.exports = router;