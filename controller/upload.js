

let formidable = require('formidable')
let fs = require('fs')
let config = require('../config/index')
let path = require('path')

let uploadController = {
    async upload(req, res) {
        try {
            let type = req.path.replace('/', '').toUpperCase()
            let URL = config[type + '_IMGS_UPLOAD_URL']
            const uploadDir = config.ROOT_PATH + '/public' + URL
            let form = new formidable.IncomingForm();
            form.encoding = 'utf-8'; // 编码
            form.keepExtensions = true; // 保留扩展名
            form.uploadDir = uploadDir  // 存储路径
            form.on('progress', function (bytesReceived, bytesExpected) {
                if (bytesExpected > config.MAX_FILE_SIZE) {
                    this.emit('error', { message: 'file is too big!' })
                }
            })
            form.on('error', function (err) {
                config.RES_ERROR(err, res)
            })
            form.parse(req, function (err, fields, files) {
                if (err) {
                    config.RES_ERROR(err, res)
                } else {
                    let filePath = files.file.path

                    console.log(111111, files)
                    let name = files.file.name
                    let index = name.lastIndexOf('.')
                    let filename = name.slice(0, index) + '_' + Date.now()
                    let ext = name.slice(index)

                    let newFilePath = uploadDir + filename + ext + '.jpg'
                    fs.renameSync(filePath, newFilePath) // 重命名文件

                    let fileName = path.basename(newFilePath) // 文件名称

                    let origin = req.protocol + '://' + req.get('host'); // 站点域名
                    let url = origin + URL + fileName // 总路径

                    res.send({ status: 1, msg: 'insert succeed', data: { url } })
                }
            })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
}

module.exports = uploadController