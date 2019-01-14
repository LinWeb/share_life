let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.Types.ObjectId

let commentSchema = new mongoose.Schema({
    _user: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    _dynamic: {
        type: String,
        required: true,
        ref: 'dynamic'
    },
    content: {
        type: String,
        required: true
    },
    create_time: {
        type: Number,
        default: Date.now
    },
    _likes: [String]
})

let commentModel = mongoose.model('comment', commentSchema, 'comment')

module.exports = commentModel