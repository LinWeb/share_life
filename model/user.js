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
            minlength: 6
        },
        password: {
            type: String,
            required: true,
            minlength: 6
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
            type: Date,
            default: Date.now
        },
        hometown: String,
        follow_ids: [ObjectId], // user表id集合
        fan_ids: [ObjectId],// user表id集合
        dynamic_ids: [ObjectId],// dynamic表id集合
        new_user_ids: [ObjectId],// new表对
    },
    config.SCHEMA_OPTION
)

module.exports = mongoose.model('user', userSchema, 'user')