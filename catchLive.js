const express = require('express')
const app = express()
const server = require('http').Server(app);
const port = 3000

const io = require('socket.io')(server);

var bodyParser = require('body-parser');

// app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/catch', (req,res) => {
    io.on('connection', (socket) => {
        console.log("Client connected!");
        socket.emit('webhook', req.body);
      });
    res.send('Received.');
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))