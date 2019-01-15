let commnetModel = require('../model/comment')
let config = require('../config/index')

let commentController = {
    async get(req, res) {
        try {
            let { _dynamic, page, per_page_count } = req.query
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
            let result = await commnetModel.find({ _dynamic })
                .populate({ path: '_user', select: 'username head_img_url' })
                .skip(per_page_count * (page - 1)) // 跳到指定位置
                .limit(per_page_count) // 限制查询数据条数
                .sort({ create_time: -1 }) // 按照时间倒序
                .lean() // 转化为JavaScript对象

            // 查询全部数据的个数
            let total = (await commnetModel.find({ _dynamic }).count())
            let page_num = Math.ceil(total / per_page_count)
            // 分页数据集合
            let pagination = {
                total,
                page,
                page_num,
                per_page_count
            }

            let user_id = req.session.user_id; // 当前用户id
            result.forEach(item => {
                let likesCount = item._likes.length;
                item['is_liked'] = user_id ? item._likes.includes(user_id) : false  // 当前用户是否已经点赞
                item['likes_count'] = likesCount  // 点赞数
            })
            res.send({ status: 1, msg: 'find succeed', data: result, pagination })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    async add(req, res) {
        try {
            let content = req.param('content'),
                _user = req.session.user_id,
                _dynamic = req.param('_dynamic');
            let resultData = await commnetModel.create({ content, _user, _dynamic })
            let _id = resultData._id
            let result = await commnetModel.findById(_id)
                .populate({ path: '_user', select: 'username head_img_url' })
                .sort({ create_time: -1 }) // 按照时间倒序
                .lean() // 转化为JavaScript对象
            result['is_liked'] = 0
            result['likes_count'] = 0
            res.send({ status: 1, msg: 'insert succeed', data: result })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    async id(req, res) {
        try {
            let id = req.param('id')
            let result = await commnetModel.findById(id).populate({ path: '_user' })
            res.send({ status: 1, msg: 'find succeed', data: result })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    async update_like(req, res) {
        try {
            let _id = req.body._id
            let is_liked = req.body.is_liked
            let user_id = req.session.user_id
            let _likes = (await commnetModel.findById(_id))._likes
            if (is_liked) {
                // 点赞
                if (_likes.includes(user_id)) {
                    res.send({ status: 0, msg: 'already like' })
                } else {
                    _likes.push(user_id)
                }
            } else {
                // 取消点赞
                if (!_likes.includes(user_id)) {
                    res.send({ status: 0, msg: 'never like' })
                } else {
                    _likes = _likes.filter(item => item !== user_id)
                }
            }
            let data = await commnetModel.findByIdAndUpdate(_id, { $set: { _likes } }, { new: true })
            res.send({ status: 1, msg: 'update succeed', data: { count: data._likes.length } })

        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
}

module.exports = commentController