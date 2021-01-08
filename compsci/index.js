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
    var ans = "";
    if(req.query.ip){
      let ip = req.query.ip;
      let port = req.query.port;
          portscanner.checkPortStatus(port, ip, function(error, status) {
          // Status is 'open' if currently in use or 'closed' if available
           ans = status;
        })
    }
    
    res.render('open-port', {
      layout: 'compsci',
      title: 'Open Port Checker',
      css: ['template.css', 'open-port.css'],
      js: ['/js/compsci/open-port.js'],
      headScripts: [],
      status: ans,
      })
})
router.get('/port', function(req, res){
  if(req.query.ip && req.query.port){

  
    let ip = req.query.ip;
    let port = req.query.port;
    let count = req.query.count;
        portscanner.checkPortStatus(port, ip, function(error, status) {
        // Status is 'open' if currently in use or 'closed' if available
        if(error){
          console.log(error)
        }else{
          let data = {
            results: status,
            count: count
          }
          res.send(data);
        }
      })
    }
 });


module.exports = router;