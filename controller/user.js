let userModel = require('../model/user')
let config = require('../config/index')

let userController = {
    // 注册
    async register(req, res) {
        try {
            let origin = req.protocol + '://' + req.get('host');
            let head_img_url = origin + config.DEFAULT_HEAD_URL
            let username = req.param('username'),
                password = req.param('password');
            await userModel.insertMany({ username, password, head_img_url })
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
            req.session.user_id = result._id.toString()
            res.send({ status: 1, msg: 'login succeed', data: { user_id: result._id } })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    // 注销
    logout(req, res) {
        req.session.destroy(function (err) {
            if (err) res.send({ status: 0, msg: 'logout failed' })
            res.clearCookie('login_id')
            res.send({ status: 1, msg: 'logout succeed' })
        })
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
    },
    // 关注
    async update_follow(req, res) {
        try {
            let user_id = req.session.user_id; // 当前用户id
            let _id = req.param('_id')
            let is_followed = req.param('is_followed')
            let _follows = (await userModel.findById(user_id))._follows
            if (is_followed) {
                // 点赞
                if (_follows.includes(_id)) {
                    res.send({ status: 0, msg: 'already follow' })
                } else {
                    _follows.push(_id)
                }
            } else {
                // 取消点赞
                if (!_follows.includes(_id)) {
                    res.send({ status: 0, msg: 'never follow' })
                } else {
                    _follows = _follows.filter(item => item !== _id)
                }
            }
            let data = await userModel.findByIdAndUpdate(user_id, { $set: { _follows } }, { new: true })
            res.send({ status: 1, msg: 'update succeed', data: { count: data._follows.length } })

        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
}


module.exports = userController