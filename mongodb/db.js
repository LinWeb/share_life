let mongoose = require('mongoose')
let config = require('../config/index')
mongoose.connect(config.MAIN_DB_URL, {
    useNewUrlParser: true, useCreateIndex: true
})
// mongoose.set('userCreateIndex', true)
let db = mongoose.connection
db.on('error', function () {
    console.error('db connect error')
})
db.once('open', function () {
    console.log('db connect succeed')
})

// 去除自动加s


// let categorySchema = new mongoose.Schema({
//     name: String,
// })

// let categoryModel = mongoose.model('category', categorySchema)
// let category = new categoryModel({
//     name: '短袖',
// })

// category.save(function (err, res) {
//     if (err) return console.error(err);
//     console.log('insert succeed')
// })

// db.createCollection('categorys', {
//     name: '短袖'
// }, function (err, res) {
//     if (err) throw new Error(err)
//     console.log('insert succeed')
// })