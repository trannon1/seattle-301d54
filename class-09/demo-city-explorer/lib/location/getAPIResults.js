'use strict';

const superagent = require('superagent');
const City = require('./City');
const insertIntoDataBase = require('./insertIntoDataBase');

function getAPIResults(response, location){
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GEOCODE_API_KEY}`;
  return superagent.get(url)
    .then(data => {

      console.log(data.body.results[0].geometry.location.lat);

      const city = new City(location, data.body);
      console.log('city', city);

      insertIntoDataBase(city);

      response.send(city);

    })
    .catch(error => {
      console.log(error)
      response.send(error).status(500);
    });
}

module.exports = getAPIResults;