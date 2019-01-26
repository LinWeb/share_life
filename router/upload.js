let express = require('express')
let router = express.Router()
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
let uploadController = require('../controller/upload')
let checkLogin = require('../middlewares/check_login')

router.post('/', checkLogin, uploadController.upload)
module.exports = router