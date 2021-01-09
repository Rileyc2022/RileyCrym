
module.exports = {
    log: function(app){
        var morgan = require('morgan')
        var path = require('path')
        var rfs = require('rotating-file-stream') // version 2.x

        // log only 4xx and 5xx responses to console
        app.use(morgan('dev', {
            skip: function (req, res) { return res.statusCode < 400 }
        }))

        
        // create a rotating write stream
        var accessLogStream = rfs.createStream('access.log', {
            interval: '1d', // rotate daily
            path: path.join(__dirname, '..', 'log')
        })

        // log all requests to access.log
        app.use(morgan('combined', {
            stream: accessLogStream
        }))
    }
}
// req.get('host') == "localhost" ||

