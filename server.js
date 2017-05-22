const express = require('express');
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.send('<button>Go Twitter</button>')
});

app.post('/', function (req, res) {

    res.send('Got a POST request')
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});