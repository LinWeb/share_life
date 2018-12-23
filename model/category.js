let mongoose = require('mongoose').Schema

let category = new mongoose.Schema({
    name: String,

})

module.exports = mongoose.model('category', category)