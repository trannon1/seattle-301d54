'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

// modules
const client = require('./lib/client');
const getLocation = require('./lib/location/location');
const getWeather = require('./lib/weather/getWeather');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3003;

//routes
app.get('/location', getLocation);
app.get('/weather', getWeather);
app.get('/events', getEvents);

//404 all unwanted extentions
app.get('*', (request, responce) => {
  responce.status(404);
});

function getEvents (request, response) {
  let locationObj = request.query.data;
  getEventsData(locationObj, response);

}

function getEventsData(object, response){
 
  let url = `http://api.eventful.com/json/events/search?location=${object.search_query}&app_key=${process.env.EVENTFUL_API_KEY}`;

  superagent.get(url)
    .then(results => {
      // first check if events HAS data then if it does map over it
      let eventsArr = JSON.parse(results.text).events.event;
      const finalEventsArr =eventsArr.map(event => new Event(event));

      response.send(finalEventsArr);
    })
    .catch(err => console.error(err));
  
  }
  function Event(eventData) {
    this.link = eventData.url;
    this.name = eventData.title;
    this.event_date = eventData.start_time;
    this.summary = eventData.description;
  }



client.connect()
  .then( () => {
    app.listen(PORT, () => console.log(`App is on port ${PORT}`));
  })
  .catch( err => console.error(err));
