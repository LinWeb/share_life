let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mall')

let db = mongoose.connection
db.on('error', function () {
    console.error('db connect error')
})
db.once('open', function () {
    console.log('db connect succeed')
})



// let categorySchema = new mongoose.Schema({
//     name: String,
//     age: Number
// })

// let Category = mongoose.model('category', categorySchema)
// let c = new Category({
//     name: '短袖',
//     age: 11
// })

// c.save(function (err, res) {
//     if (err) return console.error(err);
//     console.log('insert succeed')
// })

// db.createCollection('categorys', {
//     name: '短袖'
// }, function (err, res) {
//     if (err) throw new Error(err)
//     console.log('insert succeed')
// })