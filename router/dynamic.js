let express = require('express')
let router = express.Router()

let dynamicController = require('../controller/dynamic')
let checkLogin = require('../middlewares/check_login')


router.get('/search', dynamicController.search)
router.post('/add', checkLogin, dynamicController.add)
router.post('/del', checkLogin, dynamicController.del)
router.post('/update_like', checkLogin, dynamicController.update_like)
module.exports = router