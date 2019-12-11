'use strict';

// getting the express library that sets up our express server
const express = require('express');

// cors is the police person of the server - tells who is allowed to talk to us
const cors = require('cors');

// allows us to go into our .env and get our variables to use in our server
require('dotenv').config();

// allows us to get real data
const superagent = require('superagent');

// invoking the express library and setting it the variable app
const app = express();

// allowing everyone to talk to us
app.use(cors());


// setting the port to the env variable and setting a backup
const PORT = process.env.PORT || 3003;


// routes
app.get('/location', (request, response) => {
  try{
    const city = request.query.data;
  
    const locationData = searchLatToLong(city);
  
    console.log(locationData);
    response.send(locationData);
  }
  catch(error){
    console.error(error); // will turn the error message red if the environment supports it

    response.status(500).send('so sorry, something is not working on our end');
  }
})

app.get('*', (request, response) => {
  response.status(404).send('huh?');
})

function searchLatToLong(location){
  const geoData = require('./data/geo.json');

  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GEOCODE_API_KEY}`;

  superagent.get(url)
    .then(results => {
      
      console.log(results.body)
      // const locationObject = new Location(location, results);

      // console.log(locationObject)
      // return locationObject;
    
    });






}

function Location(city, geoData){
  this.search_query = city;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}
// turn on the server
app.listen(PORT, () => console.log(`app is listening on ${PORT}`));