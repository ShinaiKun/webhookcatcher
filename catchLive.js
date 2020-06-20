const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = 3000;
var bodyParser = require('body-parser');
const io = require('socket.io')(server);
var fs = require('fs');
const path = require('path')

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.get('/catch', (req, res) =>  {
  res.sendFile(path.join(__dirname + '/client/index.html'));
})

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public/", {
  index: false, 
  immutable: true, 
  cacheControl: true,
  maxAge: "30d"
}));

app.post('/catch', (req,res) => {
    io.emit('webhook', req.body);
    console.log(req.body);
    res.send(req.body);
})

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))