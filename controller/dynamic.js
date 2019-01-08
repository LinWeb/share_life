let dynamicModel = require('../model/dynamic')
let commentModel = require('../model/comment')
let config = require('../config/index')
let formidable = require('formidable')
let fs = require('fs')

let dynamicController = {
    async search(req, res) {
        try {
            let { _category, _author, keyword } = req.params
            let obj = {}
            if (_category) {
                obj = { _category }
            }
            if (_author) {
                obj = { _author }
            }
            // 模糊查询content
            // if (keyword) {
            //     obj = { content:{$reg:} }
            // }
            let result = await dynamicModel.find(obj)
                .populate({ path: '_author', select: 'username head_img_url' })
                .lean()
                .sort({ create_time: -1 })
            result.forEach(item => {
                let _dynamic = item._id,
                    commentCount = 0,
                    likesCount = item._likes.length;
                commentModel.count({ _dynamic }, function (err, count) {
                    commentCount = count
                })
                item['likes_count'] = likesCount
                item['comment_count'] = commentCount
                item['url'] = config.DEFAULT_HEAD_URL
            })

            res.send({ status: 1, msg: 'find succeed', data: result })
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