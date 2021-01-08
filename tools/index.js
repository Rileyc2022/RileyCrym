const express = require('express')

const router = express.Router()
router.use(express.static(__dirname + '/public'));
router.use('/math', require("./math"));
router.use('/physics', require("./physics"));
router.use('/networking', require("./networking"));

router.get('/', function(req, res){
    res.sendFile(__dirname + '/tools.html')
})



module.exports = router;