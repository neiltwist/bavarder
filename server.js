var jade = require('jade');
var express = require('express'), app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('home.jade');
});

io.sockets.on('connection', function (socket) {
    socket.on('setPseudo', function (data) {
        console.log('pseudo', data);
        socket.pseudo = data;
    });
    socket.on('message', function (message) {
        var data = { 'message' : message, pseudo : socket.pseudo };
        socket.broadcast.emit('message', data);
        console.log("user " + socket.pseudo + " send this : " + message);
    });
});
