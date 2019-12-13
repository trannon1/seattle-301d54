'use strict';

const handleLocation = require('./handleLocation');

function getLocation (request, response){
  const location = request.query.data;

  handleLocation(response, location);
};


module.exports = getLocation;