const express = require('express');
const router  = express.Router();
const userController = require('../controllers/usersController');

router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);

module.exports = router;