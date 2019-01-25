

let formidable = require('formidable')
let fs = require('fs')
let config = require('../config/index')

let uploadController = {
    async upload(req, res) {
        try {
            let form = new formidable.IncomingForm();
            form.encoding = 'utf-8'; // 编码
            form.keepExtensions = true; // 保留扩展名
            form.maxFieldsSize = 2 * 1024 * 1024; // 文件大小
            form.uploadDir = '/home/share_life/public/upload/dynamic_imgs/'  // 存储路径
            form.parse(req, function (err, fields, files) {
                let type = fields.type
                let URL = ''
                if (type == 1) {
                    // 上传头像图片
                    URL = config.HEAD_IMGS_UPLOAD_URL
                } else if (type == 2) {
                    // 上传动态图片
                    URL = config.DYNAMIC_IMGS_UPLOAD_URL
                }
                let data = fs.readFileSync(files.file.path)
                let name = files.file.name
                let index = name.lastIndexOf('.')
                let filename = name.slice(0, index) + '_' + Date.now()
                let ext = name.slice(index)
                let fileUrl = '/home/share_life/' + config.PUBLIC + URL + filename + ext
                res.send({ fileUrl })

                fs.writeFile(fileUrl, data, (err, result) => {
                    if (!err) {
                        let origin = req.protocol + '://' + req.get('host');
                        let url = origin + URL + filename + ext
                        res.send({ status: 1, msg: 'insert succeed', data: { url } })
                    }
                })
            })
        } catch (err) {
            config.RES_ERROR(err, res)
        }
    },
}

module.exports = uploadController