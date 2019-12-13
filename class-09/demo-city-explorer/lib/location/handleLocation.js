'use strict';

const client = require('../client');

function handleLocation(response, location){
  const sqlQuery = 'SELECT * FROM locations WHERE search_query = $1';
  const safeValues = [location];
  client.query(sqlQuery, safeValues)
    .then(sqlResults => {
      if(sqlResults.rows.length){
        response.status(200).json(sqlResults.rows[0]);
      } else {
        getAPIResults(response);
      }
  })
}

module.exports = handleLocation;