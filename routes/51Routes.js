const express = require('express');
const router = express.Router();

router.post('/',(req, res) =>{
    console.log('ruta raiz 51')
    return res.send('ruta raiz 51');
});

module.exports = router;