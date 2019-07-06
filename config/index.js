let path = require('path')
let fs = require('fs')
const ROOT_PATH = path.join(__dirname, '../')
const DYNAMIC_IMGS_UPLOAD_URL = '/upload/dynamic_imgs/'
const HEAD_IMGS_UPLOAD_URL = '/upload/head_imgs/'
let upload_path = path.join(ROOT_PATH, '/public/upload/')
let dynamic_imgs_path = path.join(ROOT_PATH, '/public/upload/dynamic_imgs/')
let head_imgs_path = path.join(ROOT_PATH, '/public/upload/head_imgs/')

// 如果不存在此文件夹创建文件夹
if (!fs.existsSync(upload_path)) {
    fs.mkdirSync(upload_path) // 上传文件夹
}
if (!fs.existsSync(dynamic_imgs_path)) {
    fs.mkdirSync(dynamic_imgs_path)  // 动态图片上传文件夹
}
if (!fs.existsSync(head_imgs_path)) {
    fs.mkdirSync(head_imgs_path) // 头像图片上传文件夹
}

module.exports = {
    MAIN_DB_URL: 'mongodb://localhost:27017/share_life',
    SESSION_DB_URL: 'mongodb://localhost:27017/session',
    SCHEMA_OPTION: { versionKey: false },
    USER_DEFAULT_SIGN: '这个人很懒，个人签名都不写~',
    PUBLIC: 'public',
    DEFAULT_HEAD_URL: '/images/default_head.png',
    DYNAMIC_IMGS_UPLOAD_URL,
    HEAD_IMGS_UPLOAD_URL,
    RES_ERROR(err, res) {
        res.send({ status: 0, msg: err.message })
    },
    ROOT_PATH,
    MAX_FILE_SIZE: 8 * 1024 * 1024
}