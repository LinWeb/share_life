let mongoose = require('mongoose')
let config = require('../config/index')

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
        sex: {
            type: Number,
            default: 1
        },
        sign: {
            type: String,
            default: config.USER_DEFAULT_SIGN
        },
        hobbies: [String],
        create_time: {
            type: Number,
            default: Date.now
        },
        birthday: {
            type: Date
        },
        address: {
            type: [String],
            default: []
        },
        _follows: [{
            type: String,
            ref: 'user'
        }], // user表id集合
        _fans: [{
            type: String,
            ref: 'user'
        }],// user表id集合
        _chats: [{
            type: String,
            ref: 'user'
        }],// chat表对
    },
    config.SCHEMA_OPTION
)
let userModel = mongoose.model('user', userSchema, 'user')
module.exports = userModel