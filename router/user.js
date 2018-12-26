var express = require('express');
var router = express.Router();
let userController = require('../controller/user')
let checkLogin = require('../middlewares/check_login')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/getUserInfo', checkLogin, userController.getUserInfo)

module.exports = router;
