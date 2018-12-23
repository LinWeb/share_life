let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mall')

let db = mongoose.connection
db.on('error', console.error('db connect error'))
db.once('open', function () {
    console.log('db connect succeed')
})