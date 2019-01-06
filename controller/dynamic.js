let dynamicModel = require('../model/dynamic')
let config = require('../config/index')


let dynamicController = {
    async all(req, res) {
        try {
            let _category = req.param('_category')
            let obj = {}
            if (_category) {
                obj = { _category }
            }
            let result = await dynamicModel.find(obj)
            result = result.map((item) => {
                likesCount = item._likes.length
                return { ...item, likesCount }
            })
            console.log(result)

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
            await dynamicModel.insertMany([{ content, _category, _author }])
            res.send({ status: 1, msg: 'insert succeed' })
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