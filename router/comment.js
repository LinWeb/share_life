let express = require('express')
let router = express.Router()

let commentController = require('../controller/comment')

router.post('/add', commentController.add)
router.get('/id', commentController.id)
module.exports = router