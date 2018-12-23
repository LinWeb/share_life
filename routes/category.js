let express = require('express')
let router = express.Router()
let categoryController = require('../controller/category')

router.get('/', categoryController.all)
router.get('/id', categoryController.id)
router.post('/add', categoryController.add)

module.exports = router