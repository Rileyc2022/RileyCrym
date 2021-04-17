const express = require('express')
const app = express();
const port = process.env.PORT || 80
const handlebars = require('express-handlebars');
const { getIp, email, isNotFromEU } = require('./exports');
const cookieParser = require('cookie-parser');
app.use(cookieParser());



// --- For POSTS ---
// app.use(express.urlencoded({
//     extended: true
//   }))

var password = "tZeKxest7LqUVyzk"


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

app.use(function (req, res, next) {  
res.header("X-powered-by", "Redstone");
    next();
});


var outbox = "";
var send = true;
app.all('*', function(req, res, next){
    var data = getIp(req)
    outbox += data
    outbox += "\n ------------------------------------------ \n \n"
    console.log("ADDED")
    console.log(outbox)
    if(send){
        send = false;
        setTimeout(function(){
        email("New Visitor", outbox)
        outbox = []
        send = true;
        }, 600000)
    }
    next();
});



// Redirects EU countries to block page
app.all('*', function (req, res, next) {
    var countryCode = req.header('cf-ipcountry')
    if (isNotFromEU(countryCode)) next('route')
    else next()
}, function (req, res, next) {
    email("Blocked User in EU", `Access blocked - user is in ${countryCode}.`)
    res.sendFile(__dirname + '/public/pages/EU-block.html')
})

app.get('/viewprod/:pwd', function (req, res) {
    if(req.params.pwd == password){
        res.cookie('auth', password, { maxAge: 157784760000, httpOnly: true });
        console.log('cookie created successfully');
      res.redirect('/')
    }
})

app.get('/coming-soon', function (req, res) {
    res.sendFile(__dirname + '/coming-soon.html')
})
  // Authed or not?
  app.use((req, res, next)=>{
    if(req.cookies.auth == password){
      next()
    }
    else{
        res.redirect('/coming-soon')
    }
  })

app.use(express.static('public'));
app.use('/tools', require("./tools"));



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