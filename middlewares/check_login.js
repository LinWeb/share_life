module.exports = function (req, res, next) {
    if (req.session.user_id) {
        next()
    } else {
        res.send({ status: 0, msg: 'no login' })
    }
}