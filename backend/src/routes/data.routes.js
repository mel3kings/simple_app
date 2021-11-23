module.exports = (app) => {
    const data = require('../controller/data.controller');
    app.get('/data/article', data.getAllData )
    app.get('/data/health-check', data.health)
    app.get('/data/article/:id', data.getById)
}
