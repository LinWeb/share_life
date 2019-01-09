let dynamicModel = require('../model/dynamic')
let commentModel = require('../model/comment')
let config = require('../config/index')
let formidable = require('formidable')
let fs = require('fs')

let dynamicController = {
    async search(req, res) {
        try {
            let { _category, _author, keyword, page, per_page_count } = req.query
            let query = {} // 查询参数对象
            if (_category) {
                query = { _category } // 分类条件查询
            }
            if (_author) {
                query = { _author }  // 用户条件查询
            }
            if (keyword) {
                let keywordReg = new RegExp(keyword)
                query = { content: { $regex: keywordReg } }  // 搜索关键词查询
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

            // 数据根据分页数据查询
            let result = await dynamicModel.find(query)
                .populate({ path: '_author', select: 'username head_img_url' })
                .skip(per_page_count * (page - 1)) // 跳到指定位置
                .limit(per_page_count) // 限制查询数据条数
                .sort({ create_time: -1 }) // 按照时间倒序
                .lean() // 转化为JavaScript对象

            // 查询全部数据的个数
            let total = (await dynamicModel.find(query).count())
            let page_num = Math.ceil(total / per_page_count)

            // 分页数据集合
            let pagination = {
                total,
                page,
                page_num,
                per_page_count
            }

            result.forEach(item => {
                let _dynamic = item._id,
                    commentCount = 0,
                    likesCount = item._likes.length;
                commentModel.count({ _dynamic }, function (err, count) {
                    commentCount = count
                })
                item['likes_count'] = likesCount  // 点赞数
                item['comment_count'] = commentCount  // 评论数
                item['url'] = config.DEFAULT_HEAD_URL   // 默认头像
            })

            res.send({ status: 1, msg: 'find succeed', data: result, pagination })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    async add(req, res) {
        try {
            let content = req.param('content')
            let _category = req.param('_category')
            let _author = req.param('_author')
            await dynamicModel.insertMany([req.body])
            res.send({ status: 1, msg: 'insert succeed' })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    async upload(req, res) {

        try {
            let form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                console.log(files)
                let data = fs.readFileSync(files.file.path)
                let name = files.file.name
                let index = name.lastIndexOf('.')
                let filename = name.slice(0, index) + '_' + Date.now()
                let ext = name.slice(index)
                let fileUrl = config.PUBLIC + config.DYNAMIC_IMGS_UPLOAD_URL + filename + ext
                fs.writeFile(fileUrl, data, (err, result) => {
                    if (!err) {
                        let origin = req.protocol + '://' + req.get('host');
                        let url = origin + config.DYNAMIC_IMGS_UPLOAD_URL + filename + ext
                        res.send({ status: 1, msg: 'insert succeed', data: { url } })
                    }
                })
            })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    async del(req, res) {
        try {
            let id = req.param('id')
            await dynamicModel.findByIdAndDelete(id)
            res.send({ status: 1, msg: 'delete succeed' })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    async id(req, res) {
        try {
            let id = req.param('id')
            let result = await dynamicModel.findById(id)
                .populate({ path: '_category', select: 'name -_id' })
                .populate({ path: '_author', select: 'username password -_id' })
            res.send({ status: 1, msg: 'find succeed', data: result })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
}

module.exports = dynamicController