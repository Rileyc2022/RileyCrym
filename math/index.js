const express = require('express')

const router = express.Router()
router.use(express.static(__dirname + '/public'));
router.get('/', function(req, res){
    res.render('math-home', {layout: 'math', title: 'Math Tools', css: ['template.css', 'home.css'], js: ['/js/math/home.js']});
    console.log("GET Request for /math/")
    
    // res.sendStatus(403)
})
//'https://cdnjs.cloudflare.com/ajax/libs/jGravity/0.8.0/jGravity-min.js'

router.get('/2d-distance-formula', function(req, res){
    // if(req.query.pwd == "12345678900987654321"){
        res.render('math-2d-distance-formula', {
            layout: 'math',
            title: '2D Distance Formula',
            css: ['template.css', '2d-distance-formula.css'],
            js: ['/js/math/2d-distance-formula.js'],
            headScripts: ['https://www.desmos.com/api/v1.5/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6', 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js',]});
    // }else{
        // res.sendStatus(403)
    // }
    console.log("GET Request for /math/2d-distance-formula")
    
})

module.exports = router;