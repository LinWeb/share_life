var express = require('express');
var router = express.Router();
let userController = require('../controller/user')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getUserInfo', userController.getUserInfo)

module.exports = router;
