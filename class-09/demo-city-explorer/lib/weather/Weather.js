'use strict';

function Forcast(day) {

  this.forecast = day.summary;
  let date = new Date(day.time * 1000);
  this.time = date.toDateString();

}

module.exports = Weather;