'use strict';

const express = require('express');
const app = express();
const superagent = require('superagent');

const PORT = 3000;

app.get('/photo', (request, response) => {

  let url = `https://api.unsplash.com/photos/?client_id=${process.env.ACCESSKEY}`;
  superagent.get(url)
    .then(results => {
      response.send(results);
    })
    .catch(error => console.error(error));


    console.log('I did\'t go to SWAPI but I am the second console log');

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
