const express = require('express')

const router = express.Router()
router.use(express.static('public'));
router.use('/math', require("./math"));
// router.use('/physics', require("./physics"));    Coming soon!
router.use('/networking', require("./networking"));

router.get('/', function(req, res){

    res.sendFile(__dirname + '/tools.html')
})



module.exports = router;