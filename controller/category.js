let catetoryModel = require('../model/category')

let catetory = {
    add(req, res) {
        catetoryModel.insertOne(req.params).exec(function (err, req, res) {
            if (err) throw new Error(err)
            console.log(res)
        })
    }
}

module.exports = catetory