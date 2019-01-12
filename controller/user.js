let userModel = require('../model/user')
let config = require('../config/index')
let dynamicModel = require('../model/dynamic')

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
    async info(req, res) {
        try {
            let id = req.param('id');
            let result = await userModel.findById(id).lean()
            let dynamic_count = await dynamicModel.find({ _author: id }).count()
            result['dynamic_count'] = dynamic_count || 0
            result['follows_count'] = result._follows.length
            result['fans_count'] = result._fans.length
            res.send({ status: 1, msg: 'find succeed', data: result })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    // 更新用户资料
    async update_info(req, res) {
        try {
            let data = req.body;
            let user_id = req.session.user_id;
            console.log(data)
            let result = await userModel.findByIdAndUpdate(user_id, { $set: data });
            res.send({ status: 1, msg: 'update succeed', data: result })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    // 关注
    async update_follow(req, res) {
        try {
            let user_id = req.session.user_id; // 当前用户id
            let _id = req.param('_id') // 对方用户id
            let is_followed = req.param('is_followed')
            let _follows = (await userModel.findById(user_id))._follows // 当前用户的关注集合
            let _fans = (await userModel.findById(_id))._fans // 对方用户的粉丝集合
            if (is_followed) {
                // 关注
                if (_follows.includes(_id)) {
                    res.send({ status: 0, msg: 'already follow' })
                } else {
                    _follows.push(_id)
                    _fans.push(user_id)
                }
            } else {
                // 取消关注
                if (!_follows.includes(_id)) {
                    res.send({ status: 0, msg: 'never follow' })
                } else {
                    _follows = _follows.filter(item => item !== _id)
                    _fans = _fans.filter(item => item !== user_id)
                }
            }
            let data = await userModel.findByIdAndUpdate(user_id, { $set: { _follows } }, { new: true })
            await userModel.findByIdAndUpdate(_id, { $set: { _fans } }, { new: true })

            res.send({ status: 1, msg: 'update succeed', data: { count: data._follows.length } })

        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
}


module.exports = userController