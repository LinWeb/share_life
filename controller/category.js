let catetoryModel = require('../model/category')

let catetory = {
    add(req, res) {
        catetoryModel.insertMany([{ name: req.param('name') }], function (err, result) {
            if (err) throw new Error(err)
            res.send({ status: 200 })
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

module.exports = catetory