let catetoryModel = require('../model/category')

let catetoryController = {
    add(req, res) {
        let name = req.param('name')
        if (name === '') {
            res.status(200).send({ status: 0, msg: 'param should not empty' })
        }
        catetoryModel.insertMany([{ name }], function (err, result) {
            if (err) throw new Error(err)
            res.send({ status: 200, msg: 'insert succeed' })
        })
    },
    id(req, res) {
        catetoryModel.findOne({}).exec(function (err, result) {
            if (err) throw new Error(err)
            res.send(result)
        })
    },
    all(req, res) {
        catetoryModel.find({}).exec(function (err, result) {
            if (err) throw new Error(err)
            res.send(result)
        })
    }
}

module.exports = catetoryController