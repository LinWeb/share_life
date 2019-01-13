let express = require('express')
let router = express.Router()
let uploadController = require('../controller/upload')
let checkLogin = require('../middlewares/check_login')

router.post('/', checkLogin, uploadController.upload)
module.exports = router