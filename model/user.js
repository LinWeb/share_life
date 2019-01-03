let mongoose = require('mongoose')
let config = require('../config/index')
let ObjectId = mongoose.Schema.Types.ObjectId

let userSchema = new mongoose.Schema(
    {
        state: {
            type: Number,
            default: 1,
            enum: [-1, 0, 1]
        }, //-1 隐身 0 下线 1 在线
        username: {
            type: String,
            unique: true,
            required: true,
            maxlength: 12,
            minlength: 1
        },
        password: {
            type: String,
            required: true,
            minlength: 1
        },
        head_img_url: {
            type: String,
            default: ''
        },
        age: {
            type: Number,
            min: 1
        },
        sign: {
            type: String,
            default: ''
        },
        hobbies: [String],
        birthday: {
            type: Number,
            default: Date.now()
        },
        hometown: String,
        _follows: [{
            type: ObjectId,
            ref: 'user'
        }], // user表id集合
        _fans: [{
            type: ObjectId,
            ref: 'user'
        }],// user表id集合
        _chats: [{
            type: ObjectId,
            ref: 'user'
        }],// chat表对
    },
    config.SCHEMA_OPTION
)
let userModel = mongoose.model('user', userSchema, 'user')
module.exports = userModel