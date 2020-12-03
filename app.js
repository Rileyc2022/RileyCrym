const express = require('express')
const app = express();
const port = process.env.PORT || 80
const handlebars = require('express-handlebars');
const fs = require('fs');
const chalk = require('chalk');
const { log } = require('./tools');


app.use(express.static('public'));
app.use('/cdn', require("./cdn"));
app.use('/math', require("./math"));
app.use('/compsci', require("./compsci"));

app.set('view engine', 'hbs');

//instead of app.engine('handlebars', handlebars({
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

// Last
app.get('*', function(req, res){
    res.status(404).sendFile(__dirname + '/public/pages/404.html')
  });

app.listen(port, function () {
    console.log(`Waiting for a friend on port ${port}`)
})