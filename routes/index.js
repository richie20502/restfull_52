const express = require('express');
const router = express.Router();


router.use('/users', require('./userRoutes'));
router.use('/products', require('./productRoutes'));
router.use('/51', require('./51Routes'));

module.exports = router;