let express = require('express')
let router = express.Router()

let dynamicController = require('../controller/dynamic')


router.get('/', dynamicController.all)
router.post('/add', dynamicController.add)
router.post('/del', dynamicController.del)
router.get('/id', dynamicController.id)
module.exports = router