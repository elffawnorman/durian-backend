const Article = require('../models/Article')
exports.create = async (req, res) => {
    try {
        console.log(req.body)

        const article = await new Article(req.body).save();
        res.send(article)
    } catch (err) {
        res.status(500).send("Create article failed!!")
    }
}
exports.list = async (req, res) => {
    try {
        const count = parseInt(req.params.count)
        const article = await Article.find()
            .limit(count)
            .sort([["createdAt", "desc"]])
        res.send(article);
    } catch (err) {
        res.status(500).send("List article failed!!")
    }
}
exports.read = async (req, res) => {
    try {
        const article = await Article
            .findOne({ _id: req.params.id })
            .exec()
        res.send(article)
    } catch (err) {
        res.status(500).send("read article failed!!")
    }
}
exports.edit = async (req, res) => {
    try {
        const article = await Article
            .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .exec()
        res.send(article)
    } catch (err) {
        res.status(500).send("edit article failed!!")
    }
}
exports.remove = async (req, res) => {
    try {
        const deleted = await Article.findOneAndRemove({ _id: req.params.id, }).exec();
        res.send(deleted)
    } catch (err) {
        res.status(500).send("remove article failed!!")
    }
}
exports.listBy = async (req, res) => {
    try {
        const { sort, limit } = req.body;
        const article = await Article.find()
            .limit(limit)
            .sort([[sort, 'desc']]);
        res.send(article);
    } catch (err) {
        res.status(500).send("List by article failed")
    }
}