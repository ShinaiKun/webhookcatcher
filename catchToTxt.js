const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: true
 }));
 app.use(bodyParser.json());
 app.use(bodyParser.raw());

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/catch', (req,res) => {
    fs.appendFile('log.txt', JSON.stringify(req.body), function(err) {
        if (err) throw err;
        console.log("Received webhook!");
    });
    res.send('Received.');
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))