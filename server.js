const express = require('express')
const app = express();
const port = process.env.PORT || 80

app.use(express.static('public'));
app.use('/cdn', require("./cdn"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})




// Last
app.get('*', function(req, res){
    res.status(404).sendFile(__dirname + '/public/pages/404.html')
  });

app.listen(port, function () {
    console.log(` Waiting for a friend on port ${port}`)
})
