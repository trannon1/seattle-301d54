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
  
    searchLatToLong(city, response);
  
    // console.log('I am in location with locationData = :', locationData);

  }
  catch(error){
    console.error(error); // will turn the error message red if the environment supports it

    response.status(500).send('so sorry, something is not working on our end');
  }
})

app.get('/weather', (request, response) => {
  // console.log('I am in the weather route', request.query.data);
  let latitude = request.query.data.latitude;
  let longitude = request.query.data.longitude;

  const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${latitude},${longitude}`;

  superagent.get(url)
    .then(results => {
      let dailyArray = results.body.daily.data;

      const dailyWeatherArray = dailyArray.map(day => {
        return new Weather(day);
      })
      response.send(dailyWeatherArray);
    })
    .catch(error => console.error(error));

})

app.get('*', (request, response) => {
  response.status(404).send('huh?');
})

function searchLatToLong(location, response){

  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GEOCODE_API_KEY}`;

  return superagent.get(url)
    .then(results => {
      
      // console.log(results.body)
      // { results:
      //   [ { address_components: [Array],
      //       formatted_address: 'Seattle, WA, USA',
      //       geometry: [Object],
      //       place_id: 'ChIJVTPokywQkFQRmtVEaUZlJRA',
      //       types: [Array] } ],
      //  status: 'OK' }
      const locationObject = new Location(location, results.body);

      // console.log('our location Object is: ', locationObject)
      response.send(locationObject);
    
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