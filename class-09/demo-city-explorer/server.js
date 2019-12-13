'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

// modules
const client = require('./lib/client');
const getLocation = require('./lib/location/location');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3003;

//routes
app.get('/location', getLocation);
app.get('/weather', getWeather);

// Eventful
app.get('/events', (request, response) => {
  // { search_query: 'paris',
  // formatted_query: 'Paris, France',
  // latitude: '48.856614',
  // longitude: '2.3522219' }
  let locationObj = request.query.data;
  getEventsData(locationObj, response);

})

//404 all unwanted extentions
app.get('*', (request, responce) => {
  responce.status(404);
});


function getWeather(request, response){
  const currentCity = request.query.data;
  const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${currentCity.latitude},${currentCity.longitude}`;

  superagent.get(url)
    .then(data => {

      const forcastList = data.body.daily.data.map(dailyWeather => new Forcast(dailyWeather));
      response.send(forcastList);

    })
    .catch(error => {

      console.error(error);
      response.send(error).status(500);

    });

};

function getEventsData(object, response){
 
  let url = `http://api.eventful.com/json/events/search?location=${object.search_query}&app_key=${process.env.EVENTFUL_API_KEY}`;

  superagent.get(url)
    .then(results => {
      let eventsArr = JSON.parse(results.text).events.event;
      const finalEventsArr =eventsArr.map(event => new Event(event));

      response.send(finalEventsArr);
    })
  
  }
  function Event(eventData) {
    this.link = eventData.url;
    this.name = eventData.title;
    this.event_date = eventData.start_time;
    this.summary = eventData.description;
  }

function Forcast(day) {

  this.forecast = day.summary;
  let date = new Date(day.time * 1000);
  this.time = date.toDateString();

}


client.connect()
  .then( () => {
    app.listen(PORT, () => console.log(`App is on port ${PORT}`));
  })
  .catch( err => console.error(err));
