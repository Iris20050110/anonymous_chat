var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var pusher = new Pusher({ appId: "1526485", key: "4269220ff011ab4e6a7b", 
secret:  "fbe67650660dd3ef59f9", cluster: "mt1" });

app.post('/message', function(req, res) {
  var message = req.body.message;
  pusher.trigger( 'public-chat', 'message-added', { message });
  res.sendStatus(200);
});

app.get('/',function(req,res){      
     res.sendFile('/public/index.html', {root: __dirname });
});

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`app listening on port ${port}!`)
});