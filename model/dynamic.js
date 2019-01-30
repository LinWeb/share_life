let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.Types.ObjectId

let dynamicSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200
    },
    images: [String],
    address: String,
    create_time: {
        type: Number,
        default: Date.now
    },
    _category: {
        type: ObjectId,
        required: true,
        ref: 'category'
    },
    _author: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    _likes: [{
        type: String,
        ref: 'user'
    }]
})
let dynamicModel = mongoose.model('dynamic', dynamicSchema, 'dynamic')
module.exports = dynamicModel