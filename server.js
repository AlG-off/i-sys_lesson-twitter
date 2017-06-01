const
  express = require('express'),
  axios = require('axios'),
  path = require('path'),
  cookieParser = require('cookie-parser');

const { ID_APP, SECRET_KEY, URL_VKAPI } = require('./constants/vk');

function run() {
  const app = express();

  app.use('/wall-group', express.static(path.join(__dirname, 'front')));
  app.use(cookieParser());

  app.get('/', (req, res) => {
    const { token } = req.cookies;

    if (token) {
      res.redirect('/wall-group/index.html');
    } else {
      res.send(`<button onclick="(() => { window.location = '/vkapi'})()">Go VK</button>`);
    }
  });

  app.get('/vkapi', (req, res) => {
    const { code, error, error_description } = req.query;

    if (error) {
      console.error('error');
      res.send({ error, error_description });
      return;
    }

    if (code) {
      axios.get('https://oauth.vk.com/access_token', {
        params: {
          client_id: ID_APP,
          client_secret: SECRET_KEY,
          redirect_uri: URL_VKAPI,
          code
        }
      }).then(response => {
        const { access_token } = response.data;
        res.cookie('token', access_token);
        res.redirect('/wall-group');
      }).catch(error => {
        console.error('error request', error);
        res.redirect('/');
      });
    } else {
      res.redirect(`https://oauth.vk.com/authorize?client_id=${ID_APP}&display=page&redirect_uri=${URL_VKAPI}&scope=327680&response_type=code&v=5.64`);
    }
  });

  app.get('/wall-api', (req, res) => {
    const { token } = req.cookies;

    axios({
      url: 'https://api.vk.com/method/groups.get',
      params: {
        access_token: token,
        count: 1
      }
    }).then(response => {
      const { response: resData } = response.data;

      return axios({
        url: 'https://api.vk.com/method/wall.get',
        params: {
          owner_id: `-${resData[1]}`,
          count: 5,
          extended: 1,
          fields: 'name'
        }
      });
    }).then(response => {
      res.json(response.data.response);
    }).catch(error => {
      console.error(error);
    });
  });

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
}

module.exports = { run };
