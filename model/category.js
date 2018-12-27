let mongoose = require('mongoose')
let config = require('../config/index')
let ObjectId = mongoose.Schema.Types.ObjectId
let categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
    },
    config.SCHEMA_OPTION
)
let categoryModel = mongoose.model('category', categorySchema, 'category')
module.exports = categoryModel