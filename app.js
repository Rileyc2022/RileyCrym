const express = require('express')
const app = express();
const port = process.env.PORT || 80
const handlebars = require('express-handlebars');
const fs = require('fs');
const chalk = require('chalk');
const { log } = require('./exports');


app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
  }))
app.use('/tools', require("./tools"));
app.use('/recently-used', require("./recently-used"));



app.set('view engine', 'hbs');


app.engine('hbs', handlebars({
    // where to find layouts
    layoutsDir: __dirname + '/views/layouts',
    // changes file extension to .hbs instead of .handlebars
    extname: 'hbs',
    //this will be the default layout if no layout is given down there at the res.render
    defaultLayout: 'default',
    // where to find partials
    partialsDir: __dirname + '/views/partials/'
}));

// Call log function in tools
log(app)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

// Fake wordpress login to troll hackers :)

app.get('/wp-login.php', function (req, res) {
    res.status(404).sendFile(__dirname + '/wordpress-fake/wordpress.html')

})
app.post('/submit', function (req, res) {
    res.status(404).sendFile(__dirname + '/wordpress-fake/stop.html')
    // What they put in the login
    console.log(req.body.log, req.body.pwd)
})

// Last
app.get('*', function(req, res){
    res.status(404).sendFile(__dirname + '/public/pages/404.html')
  });

app.listen(port, function () {
    console.log(`Waiting for a friend on port ${port}`)
})