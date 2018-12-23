let mongoose = require('mongoose')

let category = new mongoose.Schema({
    name: String,
})

module.exports = mongoose.model('category', category)