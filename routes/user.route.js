const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const userValidate = require('../validates/user.validate');

router.get('/', userController.index);

router.get('/cookie', (req, res) => {
    res.cookie('user-id', 123123);
    res.send('Hello cookie');
});

router.get('/view/:id', userController.viewById);

router.get('/search', userController.search);

router.get('/create', userController.viewCreate);

router.post('/create', userValidate.postCreate, userController.postCreate);

module.exports = router;