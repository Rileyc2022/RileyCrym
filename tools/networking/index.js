const express = require('express')

const router = express.Router()
router.use(express.static(__dirname + '/public'));
router.use('/open-port-check', require("./open-port-check"));



module.exports = router;