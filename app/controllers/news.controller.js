const News = require('./../models/news.model.js');

// Create and Save a new article
exports.create = (req, res) => {
    if(!req.body.content) {
        console.log(req.body);

        console.log(req.body.content);

        return res.status(400).send({
            message: " news content can not be empty"
        });

    }

    const article = new News({
        title: req.body.title || "Untitled article", 
        content: req.body.content
    });

    article.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the article."
        });
    });
};

exports.findAll = (req, res) => {
    News.find()
    .then(articles => {
        res.send(articles);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving articles."
        });
    });
};


exports.findOne = (req, res) => {
    News.findById(req.params.newsId)
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "article not found with id " + req.params.newsId
            });            
        }
        res.send(article);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "article not found with id " + req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving article with id " + req.params.newsId
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "News content can not be empty"
        });
    }

    News.findByIdAndUpdate(req.params.newsId, {
        title: req.body.title || "Untitled news",
        content: req.body.content
    }, {new: true})
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "News not found with id " + req.params.newsId
            });
        }
        res.send(article);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "article not found with id " + req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Error updating article with id " + req.params.newsId
        });
    });
};

exports.delete = (req, res) => {
    News.findByIdAndRemove(req.params.newsId)
    .then(article => {
        if(!article) {
            return res.status(404).send({
                message: "article not found with id " + req.params.newsId
            });
        }
        res.send({message: "article deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "article not found with id " + req.params.newsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete article with id " + req.params.newsId
        });
    });
};