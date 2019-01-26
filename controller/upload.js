

let formidable = require('formidable')
let fs = require('fs')
let config = require('../config/index')
let path = require('path')

let uploadController = {
    async upload(req, res) {
        console.log(req.path, req.baseUrl) // 为什么req.path取的是/dynamic? 文件是否自己命名？
        try {
            let type = req.path.replace('/', '').toUpperCase()
            let URL = config[type + '_IMGS_UPLOAD_URL']
            let form = new formidable.IncomingForm();
            form.encoding = 'utf-8'; // 编码
            form.keepExtensions = true; // 保留扩展名
            form.maxFieldsSize = 2 * 1024 * 1024; // 文件大小
            form.uploadDir = config.ROOT_PATH + '/public' + URL   // 存储路径
            form.parse(req, function (err, fields, files) {
                let fileName = path.basename(files.file.path) // 文件名称
                let origin = req.protocol + '://' + req.get('host'); // 站点域名
                let url = origin + URL + fileName // 总路径
                res.send({ status: 1, msg: 'insert succeed', data: { url } })
            })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
}

module.exports = uploadController