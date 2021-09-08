const express = require('express');
const {getData, getAllData} = require("../src/db/dbClient");
const router = express.Router();


router.get('/health-check', async function (req, res, next) {
    res.send({body: 'OK'})
});

router.get('/article/:id', async function (req, res, next) {
    const id = req.params["id"];
    const response = await getData(id);
    res.send({body: response})
});

router.get('/article', async function (req, res, next) {
    const topic = req.query.topic ? req.query.topic : '';
    const id = req.query.companyId ? req.query.companyId : '';
    const response = await getAllData(topic, id);
    res.send({body: response})
});


module.exports = router;
