const express = require('express')

const router = express.Router()
router.use(express.static('public'));

router.get('/', function(req, res){
    res.sendFile(__dirname + '/recently-used.html')
})


module.exports = router;