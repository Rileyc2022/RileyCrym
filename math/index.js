const express = require('express')

const router = express.Router()

router.get('/route', function(req, res){
    res.sendFile(__dirname+ '/file')
})

module.exports = router;