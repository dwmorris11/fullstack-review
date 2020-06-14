const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = function (user, cb) {

  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };


   axios.get(options.url, options)
  .then((response) => {
      cb(null, response);
  })
  .catch((error) => {
    cb(error, null);
  });
}

module.exports.getReposByUsername = getReposByUsername;