let catetoryModel = require('../model/category')

let catetory = {
    add(req, res) {
        catetoryModel.insertMany([req.params], function (err, result) {
            if (err) throw new Error(err)
            console.log(11111111111, result, req.params)
        })
    },
    id(req, res) {
        catetoryModel.findOne({}).exec(function (err, result) {
            if (err) throw new Error(err)
            console.log(req.params)
            res.send(result)
        })
    },
    all(req, res) {
        catetoryModel.find({}).exec(function (err, result) {
            if (err) throw new Error(err)
            res.send(result)
            console.log(result)
        })
    }
}

module.exports = catetory