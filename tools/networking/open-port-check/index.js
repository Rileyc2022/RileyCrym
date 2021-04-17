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
    let port = Math.floor(req.query.port);
    let count = req.query.count;
    let data = {
      results: null,
      count: count
    }
    var letters = /[a-zA-Z]/g;
    
  if(port > 0 && port < 65536){
    if(ip == 'localhost'){
      // Ip is localhost
      scan(port, ip)
    }else{
    if (letters.test(ip)) {
      // IP is a string hostname
      if (isValidDomain(ip)) {
        // IP is a vaild string hostname
        scan(port, ip)
      } else {
        // Ip is string but invalid
        data.results = 'invalid ip';
        res.send(data);
      }
    } else {
      //Ip is a IPV4/6 IP
      scan(port, ip)
    }
    }
  } else{
    data.results = 'invalid port';
    res.send(data);

  }
    



  function scan(port, ip){
    var dataTries = []
    var numTries = 5


    for(let i =0; i < numTries; i++){

        portscanner.checkPortStatus(port, ip, function (error, status) {
          // Status is 'open' if currently in use or 'closed' if available
          if (error) {
            console.log(error)
          } else {
            data.results = status;
            dataTries.push(data)
            if(dataTries.length == numTries){
              res.send(findMode(dataTries))
            }
          }
        })
      }

      function findMode(dataTries){
        let opens = closes = 0;
        let count = dataTries[0].count
        for(element of dataTries){

          if(element.results == "open"){
            opens++
          }
          else if(element.results == "closed"){
            closes++
          }
        }
        if(opens > closes){
          return {results: "open", count}
        }
        // more or equal num of closes, return closed
        return {results: "closed", count}
      }

    }
  }
});

module.exports = router;