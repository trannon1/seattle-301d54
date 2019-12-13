'use strict';

const superagent = require('superagent');
const City = require('./City');
const insertIntoDataBase = require('./insertIntoDataBase');

function getAPIResults(response){
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GEOCODE_API_KEY}`;
  return superagent.get(url)
    .then(data => {
      const city = new City(location, data.body);

      insertIntoDataBase(city);

      response.send(city);

    })
    .catch(error => {
      console.log(error)
      response.send(error).status(500);
    });
}

module.exports = getAPIResults;