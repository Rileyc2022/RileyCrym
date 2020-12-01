const express = require('express')
var portscanner = require('portscanner')
 
// Checks the status of a single port

const router = express.Router()
router.use(express.static(__dirname + '/public'));
router.get('/', function(req, res){
    // portscanner.checkPortStatus(req.params.id, '127.0.0.1', function(error, status) {
    //     // Status is 'open' if currently in use or 'closed' if available
    //     res.send(status)
    //   })
    res.sendFile(__dirname + '/index.html')
    console.log("GET Request for /compsci/")

})
router.get('/port', function(req, res){
  let ip = req.query.ip;
  let port = req.query.port;
      portscanner.checkPortStatus(port, ip, function(error, status) {
      // Status is 'open' if currently in use or 'closed' if available
      res.send(status)
    })
    console.log("GET Request for /compsci/port")

})



module.exports = router;