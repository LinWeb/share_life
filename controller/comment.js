let commnetModel = require('../model/comment')
let config = require('../config/index')

let commentController = {
    async add(req, res) {
        try {
            let content = req.param('content'),
                _user = req.param('_user'),
                _dynamic = req.param('_dynamic');
            await commnetModel.create({ content, _user, _dynamic })
            res.send({ status: 1, msg: 'insert succeed' })
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
}

module.exports = commentController