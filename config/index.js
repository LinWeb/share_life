let path = require('path')
const ROOT_PATH = path.join(__dirname, '../')

module.exports = {
    MAIN_DB_URL: 'mongodb://localhost:27017/share_life',
    SESSION_DB_URL: 'mongodb://localhost:27017/session',
    SCHEMA_OPTION: { versionKey: false },
    USER_DEFAULT_SIGN: '这个人很懒，个人签名都不写~',
    PUBLIC: 'public',
    DEFAULT_HEAD_URL: '/images/default_head.png',
    DYNAMIC_IMGS_UPLOAD_URL: '/upload/dynamic_imgs/',
    HEAD_IMGS_UPLOAD_URL: '/upload/head_imgs/',
    RES_ERROR(err, res) {
        res.send({ status: 0, msg: err.message })
    }, ROOT_PATH
}