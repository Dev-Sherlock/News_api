module.exports = (app) => {
    const news = require('../controllers/news.controller.js');

    app.post('/news', news.create);

    app.get('/news', news.findAll);

    app.get('/news/:newsId', news.findOne);

    app.put('/news/:newsId', news.update);

    app.delete('/news/:newsId', news.delete);
}