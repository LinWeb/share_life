let express = require('express')
let router = express.Router()

let commentController = require('../controller/comment')

router.get('/', commentController.get)
router.post('/add', commentController.add)
router.get('/id', commentController.id)
router.post('/update_like', commentController.update_like)

module.exports = router