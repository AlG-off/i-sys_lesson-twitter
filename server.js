const express = require('express');
const axios = require('axios');
const app = express();

/*app.use(function (req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
 });*/

app.get('/', function (req, res) {
    const token = req.cookies && req.cookies.token;
    if (token) {
        res.redirect('http://localhost:3000/dialogs');
    } else {
        res.send('<button onclick="(function () { window.location = `http://localhost:3000/oauthvk`; })()">Go VK</button>')
    }
});

app.get('/oauthvk', function (req, res) {
    res.redirect('https://oauth.vk.com/authorize?client_id=6045574&display=page&redirect_uri=http://localhost:3000/vkapi&scope=327680&response_type=code&v=5.64');
});

app.get('/vkapi', function (req, res) {
    if (req.query.error) {
        console.error('error');
        res.send({err: req.query.error, err_des: req.query.error_description});
        return;
    }

    if (req.query.code) {
        console.log('request on token');
        axios.get('https://oauth.vk.com/access_token?client_id=6045574&client_secret=lC3FU5bZRCLSjNwZX3yv&redirect_uri=http://localhost:3000/vkapi&code=' + req.query.code)
            .then(function (response) {
                const data = response.data;
                res.cookie('token', data.access_token, {domain: 'localhost:3000', maxAge: 900000});
                // res.redirect('http://localhost:3000/dialogs');
                return axios.get('https://api.vk.com/method/groups.get?user_id=' + data.user_id + '&count=1&access_token=' + data.access_token);
            })
            .then(function (response) {
                const data = response.data;
                return axios.get('https://api.vk.com/method/groups.get?user_id=' + data.user_id + '&count=1&access_token=' + data.access_token);
            })
            .catch(function (error) {
                console.log('error');
            })
    }
});

/*app.get('/dialogs', function (req, res) {
    const token = req.cookies.token;
    console.log(token);
    res.send('<h3>Dialogs</h3>')
});*/

//return axios.get('https://api.vk.com/method/groups.get?user_id=' + data.user_id + '&count=1&access_token=' + data.access_token)

app.run = function () {
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });
};

module.exports = app;