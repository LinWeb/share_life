let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.Types.ObjectId

let dynamicSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 200
    },
    images: [String],
    create_time: {
        type: Date,
        default: Date.now()
    },
    category_id: {
        type: ObjectId,
        required: true,
        ref: 'category'
    },
    author_id: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    comment_ids: [ObjectId],// commont表id集合
    like_ids: [ObjectId] // user表id集合
})
let dynamicModel = mongoose.model('dynamic', dynamicSchema, 'dynamic')
module.exports = dynamicModel