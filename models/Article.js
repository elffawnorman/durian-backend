const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        images: {
            type: Array,
        },
        subcontent:{
            type:String
        },
        content: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = Article = mongoose.model('article', ArticleSchema);