var express = require('express');
var router = express.Router();

const userControllers = require('../controllers/users.controllers');

//Routing
router.get('/', userControllers.index);

router.get('/search', userControllers.search);

router.get('/create', userControllers.create);

router.get('/views/:id', userControllers.viewById);

router.post('/create', userControllers.responsePostCreate);

module.exports = router;