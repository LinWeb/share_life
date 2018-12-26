let userModel = require('../model/user')
let config = require('../config/index')

let userController = {
    // 注册
    register(req, res) {
        let username = req.param('username'),
            password = req.param('password');
        userModel.insertMany({ username, password }, function (err, result) {
            if (err) {
                config.RES_ERROR(err, res)
            }
            res.send({ status: 200, msg: 'register succeed' })
        })
    },
    // 登录
    login(req, res) {
        let username = req.param('username'),
            password = req.param('password');
        userModel.findOne({ username, password }, function (err, result) {
            if (err) {
                config.RES_ERROR(err, res)
            }
            req.session.user_id = result._id
            res.send({ status: 200, msg: 'login succeed' })
        })
    },
    // 注销
    logout(req, res) {
        if (req.session.user_id) {
            delete req.session.user_id
            res.send({ status: 200, msg: 'logout succeed' })
        } else {
            res.send({ status: 0, msg: 'logout fail' })
        }
    },
    // 获取用户数据
    getUserInfo(req, res) {
        let id = req.param('id');
        userModel.findById(id, function (err, result) {
            if (err) {
                config.RES_ERROR(err, res)
            }
            res.send({ status: 200, msg: 'find succeed', data: result })
        })
    }
}


module.exports = userController