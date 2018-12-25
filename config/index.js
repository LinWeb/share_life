module.exports = {
    SCHEMA_OPTION: {
        versionKey: false
    },
    RES_ERROR(err, res) {
        res.send({ status: 0, msg: err.message })
    }
}