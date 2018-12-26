let dynamicModel = require('../model/dynamic')
let config = require('../config/index')


let dynamicController = {
    all(req, res) {
        dynamicModel.find({}).exec(function (err, result) {
            if (err) {
                config.RES_ERROR(err, res)
            }
            res.send({ status: 1, msg: 'find succeed', data: result })
        })
    },
    add(req, res) {
        let content = req.param('content')
        let category_id = req.param('category_id')
        let author_id = req.param('author_id')
        dynamicModel.insertMany([{ content, category_id, author_id }], function (err, result) {
            if (err) {
                config.RES_ERROR(err, res)
            }
            res.send({ status: 1, msg: 'insert succeed', data: result })
        })
    },
    id(req, res) {
        let id = req.param('id')
        dynamicModel.findById(id).populate('category_id', 'name').populate('author_id', 'username password').exec(function (err, result) {
            if (err) {
                config.RES_ERROR(err, res)
            }
            res.send({ status: 1, msg: 'find succeed', data: result })
        })
    }
}

module.exports = dynamicController