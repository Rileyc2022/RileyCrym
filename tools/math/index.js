const express = require('express')

const router = express.Router()
router.use(express.static(__dirname + '/public'));

router.get('/2d-distance-formula', function(req, res){

        res.render('math-2d-distance-formula', {
            layout: 'tool',
            title: '2D Distance Formula',
            css: ['/css/math/2d-distance-formula.css'],
            js: ['/js/math/2d-distance-formula.js'],
            headScripts: ['/js/recents.js', 'https://www.desmos.com/api/v1.5/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6', 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js',]});

    
})

module.exports = router;