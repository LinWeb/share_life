let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.Types.ObjectId

let commentSchema = new mongoose.Schema({
    _user: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    _dynamic: {
        type: ObjectId,
        required: true,
        ref: 'dynamic'
    },
    content: {
        type: String,
        required: true
    },
    create_time: {
        type: Number,
        default: Math.floor(Date.now() / 1000)
    },
})

let commentModel = mongoose.model('comment', commentSchema, 'comment')

module.exports = commentModel