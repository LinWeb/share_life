let path = require('path')

module.exports = {
    MAIN_DB_URL: 'mongodb://localhost:27017/share_life',
    SESSION_DB_URL: 'mongodb://localhost:27017/session',
    SCHEMA_OPTION: {
        versionKey: false
    },
    RES_ERROR(err, res) {
        res.send({ status: 0, msg: err.message })
    },
    PUBLIC: 'public',
    DEFAULT_HEAD_URL: '/images/default_head.png',
    DYNAMIC_IMGS_UPLOAD_URL: '/upload/dynamic_imgs/',
}