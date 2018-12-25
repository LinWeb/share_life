let mongoose = require('mongoose')
let config = require('../config/index')

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

module.exports = mongoose.model('category', categorySchema, 'category')