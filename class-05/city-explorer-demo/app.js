'use strict';

const weatherInstances = [];

function Weather(obj){
  this.time = obj.time;
  this.forecast = obj.summary;

  weatherInstances.push(this);
}

Weather.prototype.handlebarsCompiler = function(){
  let template = Handlebars.compile($('#weather-results-template').html());

  return template(this);
}

function render(){
  weatherInstances.forEach(day => {
    $('#weather-container').append(day.handlebarsCompiler());
  })
}


$.get('city-weather-data.json', weather => {
  weather.data.forEach(day => {
    new Weather(day);
  })
  render();
})
