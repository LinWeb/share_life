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
                password = req.param('password'),
                nickname = username;
            await userModel.insertMany({ username, password, nickname, head_img_url })
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
            let { id } = req.query
            if (!id) {
                id = req.session.user_id
            }
            let result = await userModel.findById(id).lean()
            let dynamic_count = await dynamicModel.find({ _author: id }).count()
            result['dynamic_count'] = dynamic_count || 0
            result['follows_count'] = result._follows.length
            result['fans_count'] = result._fans.length
            result['is_followed'] = result._fans.includes(req.session.user_id)
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
            let result = await userModel.findByIdAndUpdate(user_id, { $set: data });
            res.send({ status: 1, msg: 'update succeed', data: result })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    // 关注
    async update_follow(req, res) {
        try {
            let { active_id, passive_id, is_followed } = req.body; //active_id是主动关注的用户id，passive_id是被关注的用户id
            let _follows = (await userModel.findById(active_id))._follows // 主动关注的用户的关注集合
            let _fans = (await userModel.findById(passive_id))._fans //  被关注的用户的粉丝集合
            if (is_followed) {
                // 关注
                if (_follows.includes(passive_id)) {
                    res.send({ status: 0, msg: 'already follow' })
                } else {
                    _follows.push(passive_id)
                    _fans.push(active_id)
                }
            } else {
                // 取消关注
                if (!_follows.includes(passive_id)) {
                    res.send({ status: 0, msg: 'never follow' })
                } else {
                    _follows = _follows.filter(item => item !== passive_id)
                    _fans = _fans.filter(item => item !== active_id)
                }
            }
            let data = await userModel.findByIdAndUpdate(active_id, { $set: { _follows } }, { new: true })
            await userModel.findByIdAndUpdate(passive_id, { $set: { _fans } }, { new: true })

            res.send({ status: 1, msg: 'update succeed', data: { count: data._follows.length } })

        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    async get_follows(req, res) {
        try {
            let { _id, page, per_page_count } = req.query
            if (!_id) {
                _id = req.session.user_id
            }
            if (page) {
                page = Number(page)
            } else {
                page = 1   // 页码条件查询，默认1
            }
            if (per_page_count) {
                per_page_count = Number(per_page_count)
            } else {
                per_page_count = 20  // 每页显示数条件查询，默认20
            }
            let result = await userModel.findById(_id, '_follows')
                .populate({
                    path: '_follows',
                    select: 'nickname head_img_url sign sex',
                    options: {
                        skip: per_page_count * (page - 1),// 跳到指定位置
                        limit: per_page_count// 限制查询数据条数
                    }
                })
                .lean() // 转化为JavaScript对象

            // 查询全部数据的个数
            let total = (await userModel.findById(_id, '_follows'))._follows.length
            let page_num = Math.ceil(total / per_page_count)
            // 分页数据集合
            let pagination = {
                total,
                page,
                page_num,
                per_page_count
            }

            let user_id = req.session.user_id
            let user = null,
                _follows = [];
            if (user_id) {
                user = await userModel.findById(user_id, '_follows')
                _follows = user._follows// 获取当前用户关注的人的集合
            }

            let data = result._follows.map(item => {
                item['is_followed'] = _follows.includes(item._id.toString()) // 当前用户是否已经关注当前动态的作者
                return item
            })

            res.send({ status: 1, msg: 'find success', data, pagination })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    async get_fans(req, res) {
        try {
            let { _id, page, per_page_count } = req.query
            if (!_id) {
                _id = req.session.user_id
            }
            if (page) {
                page = Number(page)
            } else {
                page = 1   // 页码条件查询，默认1
            }
            if (per_page_count) {
                per_page_count = Number(per_page_count)
            } else {
                per_page_count = 20  // 每页显示数条件查询，默认20
            }
            let result = await userModel.findById(_id, '_fans')
                .populate({
                    path: '_fans',
                    select: 'nickname head_img_url sign sex',
                    options: {
                        skip: per_page_count * (page - 1),// 跳到指定位置
                        limit: per_page_count// 限制查询数据条数
                    }
                })
                .lean() // 转化为JavaScript对象

            // 查询全部数据的个数
            let total = (await userModel.findById(_id, '_fans'))._fans.length
            let page_num = Math.ceil(total / per_page_count)
            // 分页数据集合
            let pagination = {
                total,
                page,
                page_num,
                per_page_count
            }
            res.send({ status: 1, msg: 'find success', data: result._fans, pagination })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    }
}


module.exports = userController