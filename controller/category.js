let catetoryModel = require('../model/category')
let config = require('../config/index')

let catetoryController = {
    async add(req, res) {
        try {
            let name = req.param('name')
            await catetoryModel.insertMany([{ name }])
            res.send({ status: 1, msg: 'insert succeed' })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    async id(req, res) {
        try {
            let id = req.param('id')
            let result = await catetoryModel.findById(id)
            res.send({ status: 1, msg: 'find succeed', data: result })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
    async all(req, res) {
        try {
            let result = await catetoryModel.find({})
            res.send({ status: 1, msg: 'find succeed', data: result })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    }
}

module.exports = catetoryController