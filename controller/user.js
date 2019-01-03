let userModel = require('../model/user')
let config = require('../config/index')

let userController = {
    // 注册
    async register(req, res) {
        try {
            let username = req.param('username'),
                password = req.param('password');
            await userModel.insertMany({ username, password })
            res.send({ status: 1, msg: 'register succeed' })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    // 登录
    async login(req, res) {
        try {
            let username = req.param('username'),
                password = req.param('password');
            let result = await userModel.findOne({ username, password })
            req.session.user_id = result._id
            res.send({ status: 1, msg: 'login succeed', data: { user_id: result._id } })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    // 注销
    logout(req, res) {
        if (req.session.user_id) {
            delete req.session.user_id
            res.send({ status: 1, msg: 'logout succeed' })
        } else {
            res.send({ status: 0, msg: 'already logout' })
        }
    },
    // 获取用户数据
    async getUserInfo(req, res) {
        try {
            let id = req.param('id');
            let result = await userModel.findById(id)
            res.send({ status: 1, msg: 'find succeed', data: result })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    }
}


module.exports = userController