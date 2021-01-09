const express = require('express')
const portscanner = require('portscanner')
const isValidDomain = require('is-valid-domain')

const router = express.Router()
router.use(express.static(__dirname + '/public'));

router.get('/', function (req, res) {

  res.render('networking-open-port', {
    layout: 'tool',
    title: 'Open Port Check',
    css: ['/css/compsci/open-port.css'],
    js: ['/js/compsci/open-port.js'],
    headScripts: ['/js/recents.js']
  });

})

router.get('/port', function (req, res) {
  if (req.query.ip && req.query.port) {

    let ip = req.query.ip;
    let port = req.query.port;
    let count = req.query.count;
    let data = {
      results: null,
      count: count
    }
    var letters = /[a-zA-Z]/g;

    if (letters.test(ip)) {
      if (isValidDomain(ip)) {
        console.log("is a valid domain")
        scan(port, ip)
      } else {
        data.results = 'invalid'
        res.send(data);
      }
    } else {
      scan(port, ip)
    }

    function scan(port, ip){
      portscanner.checkPortStatus(port, ip, function (error, status) {
        // Status is 'open' if currently in use or 'closed' if available
        if (error) {
          console.log(error)
        } else {
          data.results = status;
          res.send(data);
        }
      })
    }
  }
});

module.exports = router;