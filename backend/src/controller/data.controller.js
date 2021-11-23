const {getAllData, getData} = require("../db/dbClient");

exports.getAllData = async (req, res) => {
    const topic = req.query.topic ? req.query.topic : '';
    const id = req.query.companyId ? req.query.companyId : '';
    const response = await getAllData(topic, id)
    res.send({
        body: response
    })
};

exports.health = (req, res) => {
    res.send({body: 'Health Check'})
};

exports.getById = async (req, res) => {
    const id = req.params["id"];
    const response = await getData(id);
    res.send({body: response})
};

